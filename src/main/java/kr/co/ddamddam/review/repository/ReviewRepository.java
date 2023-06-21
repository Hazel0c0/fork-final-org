package kr.co.ddamddam.review.repository;

import kr.co.ddamddam.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {


    // review 게시글 조회순 TOP3
    @Query(value = "SELECT * FROM tbl_review ORDER BY review_view DESC LIMIT 3", nativeQuery = true)
    List<Review> findTop3Desc();

//    @Query(value = "SELECT r FROM Review r ORDER BY r.reviewView DESC LIMIT 3", nativeQuery = true)
//    List<Review> findTop3Desc();

    @Query("SELECT r FROM Review r ORDER BY r.reviewView DESC")
    Page<Review> findByDesc(Pageable pageable);

    @Query("SELECT r FROM Review r WHERE r.reviewTitle LIKE %:keyword% " +
            "OR r.reviewContent LIKE %:keyword% OR r.reviewJob LIKE %:keyword%")
    Page<Review> findByKeyword(@Param("keyword") String keyword, Pageable pageable);


    @Query("SELECT r from Review r ORDER BY r.reviewDate DESC")
    List<Review> findByDate();

    @Query("SELECT r FROM Review r ORDER BY r.reviewRating DESC ")
    Page<Review> findByRate(Pageable pageable);

    List<Review> findByUserUserIdx(Long userIdx);

}
