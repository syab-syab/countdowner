import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useState, useEffect } from 'react'


// 休日と平日でスタイルと文を少し変える
const backgroundStyle: string = `
  background-image: linear-gradient(90deg, rgba(251, 253, 191, 1), rgba(226, 207, 255, 1));
`


const Wrapper = styled.main`
  ${backgroundStyle}
  padding: 5rem;
  height: 90vh;
  font-size: 3rem;
`

const CountNumber = styled.p`
  margin: 0 auto;
  display: inline-block;
  width: 20rem;
  height: 20rem;
  border: 0.5rem black solid;
  border-radius: 50%;
  text-align:center;
  line-height: 20rem;
`

const CountNumSpan = styled.span`
  font-size: 10rem;
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const TimeupMessage = styled.p`
  font-size: 6rem;
  margin: 0 auto;
  animation: 1s ${fadeIn} ease-out;
  animation-iteration-count: infinite;
`

const BtnWrapper = styled.div`
  display: block;
  margin-top: 5rem;
`

const PinkBtn = styled.div`
  background: #FFBBF6;
  font-size; 2.5rem;
  border: 0.1rem solid black;
  padding: 1rem 0;
`

const DarkBtnWrapper = styled.div`
  display: flex;
  margin-top: 5rem;
`

const DarkBtn = styled.div`
  background: #191919;
  border: 0.1rem white solid;
  flex-grow: 1;
  font-size: 2.5rem;
  color: white;
  padding: 1rem 0;
`

const UsefulBtnWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`

const UsefulBtn = styled.div`
  background: #191919;
  border: 0.1rem white solid;
  flex-grow: 1;
  font-size: 2.5rem;
  color: white;
  padding: 1rem 0;
`

const Main = () => {
  const [countNum, setCountNum] = useState<number>(10)

  const [start, setStart] = useState<boolean>(false)

  const [timeup, setTimeUp] = useState<boolean>(false)

  const addCountNum = (): void => {
    if(!start && countNum < 999){
      setCountNum(countNum+1)
    }
  }

  const reduceCountNum = (): void => {
    if(!start && countNum > 1) {
      setCountNum(countNum-1)
    }
  }

  const addFive = (): void => {
    if(!start && countNum < 995) {
      setCountNum(countNum+5)
    }
  }

  const reduceFive = (): void => {
    if(!start && countNum > 5) {
      setCountNum(countNum-5)
    }
  }

  const resetCountNum = (): void => {
    setCountNum(10)
    setStart(false)
    setTimeUp(false)
  }

  const toggleStart = (): void => {
    setStart(!start)
  }

  // requireを付ける必要があるらしい
  const countSound: HTMLAudioElement = new Audio(require("../sound/pi.mp3"))
  const timeupSound: HTMLAudioElement = new Audio(require("../sound/timeup.mp3"))

  useEffect(() => {
    // セットアップ処理
    const countdown = setInterval(() => {
      if(start && !timeup && countNum > 0) {
        // countSound.pause()
        setCountNum(countNum-1)
        countSound.play()
      } else if (countNum === 0) {
        // timeupSound.pause()
        setTimeUp(true)
        timeupSound.play()
      }
    }, 1000)

    // クリーンアップ処理
    // return無しだと挙動がおかしくなるから必要
    return () => clearInterval(countdown)
  }, [start, timeup, countNum, countSound])

  return (
    <Wrapper>
      {!timeup ?
        <>
          <CountNumber>
            <CountNumSpan>
              {countNum}
            </CountNumSpan>
          </CountNumber>
        </> :
        <TimeupMessage>タイム<br />アップ</TimeupMessage>
      }
      <BtnWrapper>
          {!start ?
            <PinkBtn onClick={toggleStart}>スタート</PinkBtn> : 
            timeup ? 
            <></> :
            <PinkBtn onClick={toggleStart}>ストップ</PinkBtn>
          }
          {
            !start ?
            <>
              <DarkBtnWrapper>
                <DarkBtn onClick={reduceCountNum}>－</DarkBtn>
                <DarkBtn onClick={addCountNum}>＋</DarkBtn>
              </DarkBtnWrapper>
              <UsefulBtnWrapper>
                <UsefulBtn onClick={reduceFive}>-5</UsefulBtn>
                <UsefulBtn onClick={addFive}>+5</UsefulBtn>
              </UsefulBtnWrapper>
            </>
            :
            <DarkBtnWrapper>
              <DarkBtn onClick={resetCountNum}>リセット</DarkBtn>
            </DarkBtnWrapper>
          }
      </BtnWrapper>
    </Wrapper>
  )
}

export default Main