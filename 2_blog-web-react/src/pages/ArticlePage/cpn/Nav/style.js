import styled from "styled-components";

export const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 36px;
  > div {
    flex: 1;
    @media screen and (max-width: 760px) {
      padding: 0 5px;
      /* background: #fff; */
      /* border-bottom: 1px solid #dadada; */
      /* box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%); */
    }
  }
  i {
    font-size: 1.3333em;
  }
  h4 {
    color: #3f51b5;
    font-size: 20px;
    line-height: 28px;
    font-weight: 400;
  }
  .tips {
    color: #727272;
    font-size: 16px;
    line-height: 2em;
    font-weight: bold;
  }
  @media screen and (max-width: 760px) { 
    h4 {
      font-size: 16px;
    }
    .tips {
      font-size: 16px;
    }
  }
  .prev {
    .tips {
      ::before {
        content: "< ";
      }
    }
  }
  .next {
    .tips {
      ::after {
        content: " >";
      }
    }
    text-align: right;
  }
`;
