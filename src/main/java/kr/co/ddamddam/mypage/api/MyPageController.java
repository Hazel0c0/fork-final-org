package kr.co.ddamddam.mypage.api;

import kr.co.ddamddam.chat.service.ChatService;
import kr.co.ddamddam.mentor.service.MentorService;
import kr.co.ddamddam.project.service.ProjectService;
import kr.co.ddamddam.qna.qnaBoard.service.QnaService;
import kr.co.ddamddam.review.service.ReviewService;
import kr.co.ddamddam.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/ddamddam/mypage")
public class MyPageController {

    private final UserService userService;
    private final ChatService chatService;
    private final MentorService mentorService;
    private final ProjectService projectService;
    private final QnaService qnaService;
    private final ReviewService reviewService;

    @GetMapping("/list")
    public ResponseEntity<?> list(

    ){
        Long enterUser = 1L;



        return  null;
    }

}
