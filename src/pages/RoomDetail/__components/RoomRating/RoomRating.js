import React, {useEffect, useState} from 'react';
import './RoomRating.scss';
import {Link, useParams} from "react-router-dom";
import RattingStars from "../../../../components/RattingStarts/RattingStars";

import {getRatingAPI, getRatingStatsAPI, getUserInfoAPI} from "../../../../api";
import {formatDateTime} from "../../../../common/helpers";

function RatingFilterItem({rate, rateFilter, stats, setRateFilter}) {
  const s = (stats || []).find(item => item.rate === rate);
  return (
    <div
      className={`room-rating-overview__filter ${rateFilter === rate ? 'room-rating-overview__filter--active' : ''}`}
      onClick={() => {
        setRateFilter(rate)
      }}
    >
      {rate === 0 ? 'Tất cả' : `${rate} sao${s ? ` (${s.count})` : ''}`}
    </div>
  )
}

function RoomRating({ratingID}) {
  const [rate, setRate] = useState(0);
  const [ratingList, setRatingList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [avg, setAvg] = useState(0);
  const [stats, setStats] = useState([]);
  const {roomID} = useParams();

  useEffect(() => {
    const getRating = async () => {
      setIsLoaded(false);
      const params = {};
      if (rate) {
        params.rate = rate;
      }
      const {data: {data: {pageData, pageInfo}}} = await getRatingAPI(roomID, params);
      const {data: {data: stats}} = await getRatingStatsAPI(roomID);
      const ratings = [];
      for (const item of pageData) {
        const {data: {data}} = await getUserInfoAPI(item.user_id);
        ratings.push({...item, userInfo: data});
      }
      let total = 0, totalCount = 0, avg = 0;
      if (stats && Array.isArray(stats)) {
        for (let item of stats) {
          total += item.count * item.rate;
          totalCount += item.count;
        }
        avg = Math.round((total / totalCount) * 10) / 10;
      }
      return {
        ratings,
        avg,
        stats,
      }
    };

    getRating().then(({ratings, stats, avg}) => {
      setRatingList(ratings);
      setAvg(avg);
      setStats(stats);
      setIsLoaded(true);
    }).catch(error => console.log(error));
  }, [roomID, ratingID, rate]);


  return (
    <div className="room-rating">
      <h3 className="room-rating__title">
        Đánh giá phòng
      </h3>
      {
        !isLoaded &&
        <div>Loading....</div>
      }
      {
        isLoaded && ratingList &&
        <>
          <div className="room-rating__wrapper">
            <div className="room-rating-overview__briefing">
              <div className="room-rating-overview__score-wrapper">
                <span className="room-rating-overview__rating-score">{avg}</span>
                <span className="room-rating-overview__rating-score-out-of">trên 5</span>
              </div>
              <div className="room-rating-overview__stars">
                <RattingStars score={4}/>
              </div>
            </div>

            <div className="room-rating-overview__filters">
              <RatingFilterItem
                rate={0}
                rateFilter={rate}
                stats={stats}
                setRateFilter={setRate}
              />
              <RatingFilterItem
                rate={5}
                rateFilter={rate}
                stats={stats}
                setRateFilter={setRate}
              />
              <RatingFilterItem
                rate={4}
                rateFilter={rate}
                stats={stats}
                setRateFilter={setRate}
              />
              <RatingFilterItem
                rate={3}
                rateFilter={rate}
                stats={stats}
                setRateFilter={setRate}
              />
              <RatingFilterItem
                rate={2}
                rateFilter={rate}
                stats={stats}
                setRateFilter={setRate}
              />
              <RatingFilterItem
                rate={1}
                rateFilter={rate}
                stats={stats}
                setRateFilter={setRate}
              />
            </div>
          </div>

          <div className="room-rating__list">
            <div className="room-rating-comment-list">
              {
                ratingList.map((item, index) => (
                  <div className="room-rating-comment-item" key={index}>
                    <div className="room-rating-comment-item__avatar"
                         style={{backgroundImage: `url("https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")`}}></div>
                    <div className="room-rating-comment-item__main">
                      <Link className="room-rating-comment-item__author-name" to="">{item.userInfo.full_name}</Link>
                      <div className="room-rating-comment-item__rating">
                        <RattingStars score={item.rate}/>
                      </div>
                      <div className="room-rating-comment-item__content">{item.comment}</div>
                      <div className="room-rating-comment-item__created">{formatDateTime(item.created_at)}</div>
                    </div>

                  </div>
                ))
              }
            </div>
            {/*<div className="room-rating-comment-pagination">*/}
            {/*  <Pagination/>*/}
            {/*</div>*/}
          </div>
        </>
      }
    </div>
  );
}

export default RoomRating;
