import React, {useEffect, useRef, useState} from 'react';
import Common from "../common/Common";
import logo from "../../src_assets/logo(white).png";
import profile from "../../src_assets/IMG_4525.JPG";
import './scss/UserJoin.scss';
import {LocalDate, MathUtil as Integer} from 'js-joda';
import {BsCheckLg} from "react-icons/bs"
// 리다이렉트 사용하기
import {useNavigate, Link} from 'react-router-dom';
import {BASE_URL as BASE, AUTH, JOININ} from '../../component/common/config/HostConfig';

const UserJoin = () => {

    // 리다이렉트 사용하기
    const redirection = useNavigate();

    // const BASE_URL = BASE + AUTH;
    const BASE_URL = JOININ;

    //이메일 주소 선택 값
    // const [emailValue,setEmailValue]
    const emailValue = useRef();

    // 상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        userEmail: '',
        password: '',
        userName: '',
        nickName: '',
        userBirth: '',
        userPosition: '프론트엔드',
        userCareer: '',
        userProfile: 'null'
    });

    // 검증 메세지에 대한 상태변수 관리
    const [message, setMessage] = useState({
        userEmail: '',
        password: '',
        passwordCheck: '',
        userName: '',
        nickName: '',
        userBirth: '',
        userPosition: '',
        userCareer: ''
    });

    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        userEmail: false,
        password: false,
        passwordCheck: false,
        userName: false,
        nickName: false,
        userBirth: false,
        userPosition: false,
        userCareer: false
    });

    // 검증데이터를 상태변수에 저장하는 함수
    const saveInputState = ({key, inputVal, flag, msg}) => {

        inputVal !== 'pass' && setUserValue({
            ...userValue,
            [key]: inputVal
        });

        setMessage({
            ...message,
            [key]: msg
        });

        setCorrect({
            ...correct,
            [key]: flag
        });
    };


    // 이름 입력창 체인지 이벤트 핸들러
    const nameHandler = e => {

        //입력한 값을 상태변수에 저장
        // console.log(e.target.value());

        const nameRegex = /^[가-힣]{2,5}$/;

        const inputVal = e.target.value;
        // 입력값 검증
        let msg; // 검증 메시지를 저장할 변수
        let flag; // 입력 검증체크 변수

        if (!inputVal) {
            msg = '유저 이름은 필수입니다.';
            flag = false;
        } else if (!nameRegex.test(inputVal)) {
            msg = '2~5글자 사이의 한글로 작성하세요!';
            flag = false;
        } else {
            msg = '사용 가능한 이름입니다.';
            flag = true;
        }


        saveInputState({
            key: 'userName',
            inputVal,
            msg,
            flag
        });
    };

    // 닉네임 입력창 체인지 이벤트 핸들러
    const nicknameHandler = e => {

        //입력한 값을 상태변수에 저장
        // console.log(e.target.value);

        const nameRegex = /^[가-힣a-zA-Z]{2,8}$/;

        const inputVal = e.target.value;

        // console.log(`inputVal의 값 : ${inputVal}`)
        // 입력값 검증
        let msg; // 검증 메시지를 저장할 변수
        let flag; // 입력 검증체크 변수
        console.log(nameRegex.test(inputVal));
        if (!inputVal) {
            msg = '유저 닉네임은 필수입니다.';
            flag = false;
        } else if (!nameRegex.test(inputVal)) {
            msg = '닉네임은 한글 또는 영어로 2~8자여야 합니다.';
            flag = false;
        } else {
            msg = '사용 가능한 닉네임입니다.';
            flag = true;
        }
        console.log(msg)
        saveInputState({
            key: 'nickName',
            inputVal,
            msg,
            flag
        });
    };

    // 이메일 중복체크 서버 통신 함수
    const fetchDuplicateCheck = async (email) => {

        const res = await fetch(`${BASE_URL}/check?email=${email}`);
        console.log(res);
        /*
        let msg = '', flag = false;
        if (res.status === 200) {
            const json = await res.json();
            console.log(json);
            if (json) {
                msg = '이메일이 중복되었습니다!';
                flag = false;
            } else {
                msg = '사용 가능한 이메일입니다.';
                flag = true;
            }
        } else {
            alert('서버 통신이 원활하지 않습니다!');
        }

        setUserValue({...userValue, userEmail: email });
        setMessage({...message, userEmail: msg });
        setCorrect({...correct, userEmail: flag });
        */

    };

    // 이메일 입력창 체인지 이벤트 핸들러
    const emailHandler = e => {

        //이메일 입력
        const inputEmail = e.target.value;
        //이메일 주소 선택
        const emailDomainValue = emailValue.current.value;
        console.log(emailDomainValue);

        const inputVal = `${inputEmail}@${emailDomainValue}`;
        console.log(`emailResult Value : ${inputVal}`);
        // const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
        const emailRegex = /^[a-z0-9\.\-_]+/;


        let msg='', flag=false;

        saveInputState({
            key: 'userEmail',
            inputVal,
            msg,
            flag
        });

    };


// 패스워드 입력창 체인지 이벤트 핸들러
    const passwordHandler = e => {

        // 패스워드가 변동되면 확인란을 비우기
        document.getElementById('passwordCheck').value = '';
        // document.getElementById('check-span').textContent = '';

        setMessage({...message, passwordCheck: ''});
        setCorrect({...correct, passwordCheck: false});

        const inputVal = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        // 검증 시작
        let msg, flag;
        if (!e.target.value) { // 패스워드 안적었을때
            msg = '비밀번호는 필수값입니다!';
            flag = false;
        } else if (!pwRegex.test(e.target.value)) {
            msg = '8글자 이상의 영문,숫자,특수문자를 포함해주세요!';
            flag = false;
        } else {
            msg = '사용 가능한 비밀번호입니다.';
            flag = true;
        }

        saveInputState({
            key: 'password',
            inputVal,
            msg,
            flag
        });

    };

    // 비밀번호 확인란 검증 이벤트 핸들러
    const pwcheckHandler = e => {
        // 검증 시작
        let msg, flag;
        if (!e.target.value) { // 패스워드 안적은거
            msg = '비밀번호 확인란은 필수값입니다!';
            flag = false;
        } else if (userValue.password !== e.target.value) {
            msg = '패스워드가 일치하지 않습니다.';
            flag = false;
        } else {
            msg = '패스워드가 일치합니다.';
            flag = true;
        }

        saveInputState({
            key: 'passwordCheck',
            inputVal: 'pass',
            msg,
            flag
        });

    };


// userBirth 입력값 변경 핸들러
    const birthHandler = (event) => {
        const inputDate = event.target.value; // 입력받은 문자열
        console.log(inputDate)
        /*
        const year = parseInt(inputDate.substring(0, 4));
        const month = parseInt(inputDate.substring(4, 6));
        const day = parseInt(inputDate.substring(6, 8));

        const localDate = new Date(year, month - 1, day); // JavaScript의 Date 객체 생성
 */

        setUserValue(prevValue => ({
            ...prevValue,
            userBirth: inputDate // Date 객체로 입력받음
        }));

    };

    // userCareer 입력값 변경 핸들러
    const careerHandler = (event) => {
        setUserValue(prevValue => ({
            ...prevValue,
            userCareer: parseInt(event.target.value) // 문자열을 정수로 변환
        }));
    };

// 포지션 입력받기 핸들러
    const [selectedPosition, setSelectedPosition] = useState('');
    const positionHandler = e => {
        const selectedValue = e.target.value;
        setSelectedPosition(selectedValue);
    };

    //입력칸이 모두 검증에 통과했는지 여부를 검사
    const isValid = () => {

        for (const key in correct) {
            const flag = correct[key];
            if (!flag) return false;
        }
        return true;
    };

    // 회원가입 처리 서버 요청
    const fetchSignUpPost = async () => {
        console.log(userValue);
        const res = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(userValue)
        });

        if (res.status === 200) {
            alert('회원가입에 성공했습니다! 축하합니다!');
            // 로그인 페이지로 리다이렉트
            // window.location.href = '/login';
            redirection('/login');
        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    };


    //회원가입 버튼 클릭 이벤트 핸들러
    const joinButtonClickHandler = e => {

        e.preventDefault();  //submit기능 중단 시키기
        // const $nameInput = document.getElementsByName('name');
        console.log(userValue)
        // 회원가입 서버 요청
        if (isValid()) {
            fetchSignUpPost();
            // alert('회원가입 정보를 서버에 전송합니다.')
        } else {
            alert('입력란을 다시 확인해주세요!');
        }
    }

    //가입완료 클릭
    const submitHandler = () =>{

    }

    //렌더링이 끝난 이후 실행되는 함수
    useEffect(() => {
    }, []);

    return (
        <Common className={'join-wrapper'}>
            <section className={'top-wrapper'}>
                <img src={logo} alt={'logo'} className={'logo'}/>
                <div className={'main-title'}>HI,WE ARE<br/>DDAMDDAM CLUB</div>
            </section>
            <div className={'background'}></div>
            <section className={'form-wrapper'}>
                <img src={profile} alt={'profileImg'} className={'profile-img'}></img>
                <div className={'profile-img-text'}>프로필을 등록해주세요</div>
                <div className={'input-email'}>
                    <input type={"text"} className={'email-input'} id={'userEmail'} name={'userEmail'}
                           placeholder={'이메일'} onChange={emailHandler}/>
                    <select className={'email-select'} defaultValue={''}  ref={emailValue}>
                        <option value={'gmail.com'}>@gmail.com</option>
                        <option value={'naver.com'}>@naver.com</option>
                    </select>
                    {/*<span style={*/}
                    {/*    correct.userEmail ? {color: 'green'} : {color: 'red'} //입력값검증시에 글씨 색깔*/}
                    {/*}>{message.userEmail}</span>*/}
                    <button className={'check-btn'}>인증하기</button>
                </div>

                {/* 인증하기 버튼 누르면 나오게 */}
                <section className={"check-email-wrapper"}>
                    <div className={"email-text"}>해당 이메일로 코드를 보냈습니다. 확인 후 인증코드를 입력해주세요.</div>
                    <div>
                        <input type={"text"} className={"check-email-input"} name={"checkEmail"} placeholder={""}/>
                        <button className={"confirm-check-email"}>제출</button>
                    </div>
                </section>

                <div className={'input-pw'}>
                    <input type={"text"} className={'pw'} id={'password'} name={'password'} placeholder={'비밀번호'}
                           onChange={passwordHandler}/>
                    <span className={correct.password ? 'correct' : 'not-correct'}>{message.password}</span>
                    {correct.password &&
                        <BsCheckLg className={'check'}/>
                    }
                </div>
                <div className={'input-pwcheck'}>
                    <input type={"text"} className={'pw-check'} id={'passwordCheck'} name={'pw-check'}
                           placeholder={'비밀번호 확인'} onChange={pwcheckHandler}/>

                    <span className={correct.passwordCheck ? 'correct' : 'not-correct'}>{message.passwordCheck}</span>

                    {correct.passwordCheck &&
                        <BsCheckLg className={'check'}/>
                    }
                </div>



                <div className={'input-detail'}>

                    {/*이름*/}
                    <input type={"text"} className={'name'} id={'username'} name={'username'} placeholder={'이름'}
                           onChange={nameHandler}/>
                    <span className={correct.userName ? 'correct' : 'not-correct'}>{message.userName}</span>

                    {correct.userName &&
                        <BsCheckLg className={'check'}/>
                    }

                    {/*닉네임*/}
                    <input type={"text"} className={'nickname'} id={'nickname'} name={'nickname'} placeholder={'닉네임'}
                           onChange={nicknameHandler}/>
                    <span className={correct.nickName ? 'correct' : 'not-correct'}>{message.nickName}</span>

                    {correct.nickName &&
                        <BsCheckLg className={'check'}/>
                    }

                    {/*<input type={"text"} className={'career'} name={'userCareer'} defaultValue={''} id={'userCareer'}*/}
                    {/*       placeholder={'경력 (ex.1년 이상)'} onChange={careerHandler}/>*/}

                    <select className={'career'} id={'userCareer'} name={'userCareer'} defaultValue={''}
                            onChange={careerHandler}>
                        <option value={'0'}>신입</option>
                        <option value={'1'}>1년 이상</option>
                        <option value={'3'}>3년 이상</option>
                        <option value={'5'}>5년 이상</option>
                    </select>

                    <input type={"date"} className={'birth'} id={'userBirth'} name={'userBirth'}
                           placeholder={'생년월일 8자리 (ex.19960214)'} onChange={birthHandler}/>
                    <select className={'position-select'} id={'userPosition'} defaultValue={'selectedPosition'}
                            onChange={positionHandler}>
                        <option value={'프론트엔드'}>프론트엔드</option>
                        <option value={'백엔드'}>백엔드</option>
                    </select>
                </div>

                <button type={'submit'} className={'submit-btn'} onClick={joinButtonClickHandler}>가입완료</button>
            </section>
        </Common>
    );
};

export default UserJoin;