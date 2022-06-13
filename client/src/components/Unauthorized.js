import styled from 'styled-components';

const Unauthorized = () => {

    return (
        <Wrapper>
            <Container>
                <Span>🔒</Span>
                <Title>you must be logged in to view this page!</Title>
            </Container>
        </Wrapper>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
height: 115px;
justify-content: space-between;
margin-left: 225px;
margin-top: -225px;
`

const Title = styled.p`
font-size: 22px;
margin-left: 15px;
`

const Span = styled.span`
font-size: 80px;
`

const Wrapper = styled.div`
width: 100%;
min-height: calc(100vh - 50px);
display: flex;
align-items: center;
`

export default Unauthorized;