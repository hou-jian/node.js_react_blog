import styled from 'styled-components';

export const HomePageWrapper = styled.div`
  min-height: calc(100vh - 126px);

`

export const Main = styled.div`
  width: 960px;
  margin: 0 auto;
  padding: 30px 0 40px;
  @media screen and (max-width: 1040px) {
    width: 100%;
    padding: 20px 16px
  }
  .article-list-wrap {
    background-color: lightblue;
  }
`

