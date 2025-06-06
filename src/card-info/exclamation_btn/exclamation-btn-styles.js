export const styles =`a {
    --circle-size: 3em;
    --color-bg: #333;
    --color-icon: white;
    display: inline-block;
    width: var(--circle-size);
    height: var(--circle-size);
    border-radius: 50%;
    background-color: var(--color-bg);
    position: relative;
    text-decoration: none;
  }

  a::before {
    content: '';
    position: absolute;
    width: calc(var(--circle-size) * 0.08);
    height: calc(var(--circle-size) * 0.4);
    top: calc(var(--circle-size) * 0.2);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-icon);
    border-radius: 50px;
  }

  a::after {
    content: '';
    position: absolute;
    width: calc(var(--circle-size) * 0.08);
    height: calc(var(--circle-size) * 0.08);
    bottom: calc(var(--circle-size) * 0.2);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-icon);
    border-radius: 50%;
  }
`;