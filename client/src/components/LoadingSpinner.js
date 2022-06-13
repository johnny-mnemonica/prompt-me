import styled from 'styled-components';

const LoadingSpinner = () => {

    return (
        <Wrapper>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: "auto",
          background: "rgba(0, 0, 0, 0) none repeat scroll 0% 0%",
        }}
        width="137"
        height="137"
        display="block"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 100"
      >
        <defs>
          <mask id="ldio-k5pd9jcps9-mask">
            <path
              fill="#fff"
              stroke="#000"
              strokeWidth="0"
              d="M50 13l25 17v40L50 87 25 70V30l25-17z"
            ></path>
          </mask>
        </defs>
        <path
          fill="#ee6123"
          stroke="#ee6123"
          strokeWidth="0"
          d="M50 13l25 17v40L50 87 25 70V30l25-17z"
        ></path>
        <path
          fill="#ee6123"
          stroke="#ee6123"
          strokeWidth="0"
          d="M50 13l25 17v40L50 87l8.3-17V30z"
          mask="url(#ldio-k5pd9jcps9-mask)"
        >
          <animate
            attributeName="d"
            begin="-0.2s"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
          ></animate>
          <animate
            attributeName="fill"
            begin="-0.2s"
            dur="1s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            values="#ee6123;#eeca77;#7db0dc"
          ></animate>
        </path>
        <path
          fill="#ee6123"
          stroke="#ee6123"
          strokeWidth="0"
          d="M50 13l25 17v40L50 87l8.3-17V30z"
          mask="url(#ldio-k5pd9jcps9-mask)"
        >
          <animate
            attributeName="d"
            begin="-0.4s"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
          ></animate>
          <animate
            attributeName="fill"
            begin="-0.4s"
            dur="1s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            values="#ee6123;#eeca77;#7db0dc"
          ></animate>
        </path>
        <path
          fill="#ee6123"
          stroke="#ee6123"
          strokeWidth="0"
          d="M50 13l25 17v40L50 87l8.3-17V30z"
          mask="url(#ldio-k5pd9jcps9-mask)"
        >
          <animate
            attributeName="d"
            begin="-0.6s"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
          ></animate>
          <animate
            attributeName="fill"
            begin="-0.6s"
            dur="1s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            values="#ee6123;#eeca77;#7db0dc"
          ></animate>
        </path>
        <path
          fill="#ee6123"
          stroke="#ee6123"
          strokeWidth="0"
          d="M50 13l25 17v40L50 87l8.3-17V30z"
          mask="url(#ldio-k5pd9jcps9-mask)"
        >
          <animate
            attributeName="d"
            begin="-0.8s"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
          ></animate>
          <animate
            attributeName="fill"
            begin="-0.8s"
            dur="1s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            values="#ee6123;#eeca77;#7db0dc"
          ></animate>
        </path>
        <path
          fill="#ee6123"
          stroke="#ee6123"
          strokeWidth="0"
          d="M50 13l25 17v40L50 87l8.3-17V30z"
          mask="url(#ldio-k5pd9jcps9-mask)"
        >
          <animate
            attributeName="d"
            begin="-1s"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
          ></animate>
          <animate
            attributeName="fill"
            begin="-1s"
            dur="1s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            values="#ee6123;#eeca77;#7db0dc"
          ></animate>
        </path>
        <path
          fill="#ee6123"
          stroke="#ee6123"
          strokeWidth="0"
          d="M25 30h50M25 70h50"
        ></path>
      </svg>
      </Wrapper>
    )
}

const Wrapper = styled.div`
min-width: 100vw;
min-height: calc(100vh - 50px);
display: flex;
justify-content: center;
align-items: center;
`

export default LoadingSpinner;