import React from 'react'
import styled from 'styled-components'

const backgroundStyle: string = `
  background-image: linear-gradient(90deg, rgba(251, 253, 191, 1), rgba(226, 207, 255, 1));
`

const Wrapper = styled.header`
  ${backgroundStyle}
  padding: 1.5rem 0;
`

const Title = styled.p`
  font-size: 3rem;
  font-weight: bold;
  padding: 0;
  margin: 0;
`

const Header = () => {
  return (
    <Wrapper>
      <Title>
        カウントダウナー
      </Title>
    </Wrapper>
  )
}

export default Header