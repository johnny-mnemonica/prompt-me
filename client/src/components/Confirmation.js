import { Link } from "react-router-dom";
import styled from 'styled-components';

const Confirmation = () => {


    return (
        <Wrapper>
            success! you made a new blog post
        </Wrapper>
    )
}

const Wrapper = styled.div`
width: 100%;
min-height: calc(100vh - 50px);
`

export default Confirmation;

