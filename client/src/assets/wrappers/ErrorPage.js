import styled from 'styled-components'

const Wrapper = styled.main`
  text-align: center;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2em;
  }
  h3 {
    margin-bottom: 0.5em;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-800);
    text-decoration: underline;
    text-transform: capitalize;
  }
`

export default Wrapper
