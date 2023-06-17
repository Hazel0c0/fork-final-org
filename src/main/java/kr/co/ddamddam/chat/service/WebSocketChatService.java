package kr.co.ddamddam.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.ddamddam.chat.dto.request.ChatValidateRequestDTO;
import kr.co.ddamddam.chat.entity.ChatRoom;
import kr.co.ddamddam.chat.repository.ChatRoomRepository;
import kr.co.ddamddam.mentor.entity.Mentor;
import kr.co.ddamddam.mentor.repository.MentorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
@ServerEndpoint("/socket/chat")
@Slf4j
@RequiredArgsConstructor
public class WebSocketChatService {
    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<>());

//    private final MentorRepository mentorRepository;
//    private final ChatRoomRepository chatRoomRepository;


    @OnOpen
    public void onOpen(Session session) {
        log.info("open session: {}, clients={}", session.getId(), clients);

        if (!clients.contains(session)) {
            clients.add(session);
            log.info("session open: {}", session.getId());
        } else {
            log.info("이미 연결된 session");
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        log.info("receive message: {}", message);
        ObjectMapper objectMapper = new ObjectMapper();
        ChatValidateRequestDTO dto = objectMapper.readValue(message, ChatValidateRequestDTO.class);

        // 필드 값 추출 예시
        Long mentorIdx = dto.getMentorIdx();
        Long senderId = dto.getSenderId();
        String name = dto.getName();
        String msg = dto.getMsg();
        String date = dto.getDate();

//        Mentor mentor = mentorRepository.findById(mentorIdx).orElseThrow(() -> new IllegalArgumentException("Invalid mentorId"));
//        if (mentor.getUser().getUserIdx() == senderId) {
//            log.info("같음");
//        }
//        ChatRoom chatRoom = chatRoomRepository.findByMentorMentorIdxAndSenderUserIdx(mentorIdx, senderId);
//        log.info("chatRoom: {}", chatRoom);
        // 로직 처리 등 필요한 작업 수행

        // 추출한 필드 값 사용 예시
        log.info("roomId: {}", dto.getRoomId());
        log.info("mentorIdx: {}", mentorIdx);
        log.info("senderId: {}", senderId);
        log.info("name: {}", name);
        log.info("msg: {}", msg);
        log.info("date: {}", date);
        for (Session s : clients) {
            log.info(s.getId());
            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(Session session) {
        log.info("session close: {}", session.getId());
        clients.remove(session);
    }
}
