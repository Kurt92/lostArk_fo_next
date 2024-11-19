"use client"

import "./boss.css"
import CustomBtn from "@/shared/components/Button/CustomBtn";
import React from "react";
import UserCard from "@/shared/components/Card/UserCard";
import {Divider} from "@mui/material";

export default function Boss() {


    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <>
            <div className={"content"}>
                <div className={"flex mb-10"}>
                    <div className={"user-box"}>
                        <div className={"bookmark"}>
                            <div>즐겨찾기</div>
                            <UserCard/>
                        </div>

                        <Divider
                            sx={{
                                my: 2,                  // 상하 간격 추가
                                mx: 2,                  // 양쪽 간격 추가
                                borderColor: 'grey.300' // 선 색상 설정
                            }}
                        />

                        <div className={"user-list"}>
                            <div>친구목록</div>
                            <UserCard/>
                        </div>
                    </div>
                    <div className={"sixman-box"}>

                    </div>
                </div>
                <div className={"btn-area"}>
                    <CustomBtn label="식스맨 변경" onClick={handleClick} color="primary" variant="outlined"  />
                </div>
            </div>

        </>
    );
}