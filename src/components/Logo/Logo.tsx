import React from "react";

type LogoProps = {
  fill: string;
  height?: number;
  width?: number;
};

const ZHLogo = ({ fill, height = 41, width = 56 }: LogoProps) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.87741 13.6416C3.56727 14.0791 4.32282 14.376 5.14407 14.5323C5.99817 14.6886 7.1972 14.7667 8.74116 14.7667H21.0107C21.6677 15.298 21.9962 15.9699 21.9962 16.7825L20.6658 17.5325L7.70638 35.3463H15.4426C16.6909 35.3463 17.5614 35.2213 18.0542 34.9713C18.5798 34.69 18.9411 34.1587 19.1382 33.3774L19.7295 30.8928L21.2571 31.4085V38.6278L20.6658 39.1903C19.9759 38.7528 19.2039 38.4559 18.3498 38.2996C17.5286 38.1434 16.346 38.0652 14.802 38.0652H2.18756L1.64553 36.612L15.4919 17.4856H8.10058C6.85228 17.4856 5.96532 17.6263 5.43972 17.9075C4.94697 18.1576 4.60204 18.6732 4.40494 19.4545L3.81364 21.9391L2.28611 21.4234V14.2041L2.87741 13.6416ZM5.84442 19.7747L4.88786 23.794L0.807856 22.4166V13.6216L2.68906 11.8319L3.6974 12.4715C4.22346 12.8051 4.79689 13.0314 5.42869 13.1522C6.14635 13.2829 7.23468 13.3603 8.74116 13.3603H21.5541L21.9681 13.6951C22.9518 14.4907 23.4744 15.5528 23.4744 16.7825V17.5838L21.6974 18.5857L10.5273 33.9399H15.4426C16.6353 33.9399 17.1796 33.8112 17.3425 33.738C17.4016 33.7014 17.5698 33.5629 17.6988 33.0572L18.6553 29.0379L22.7353 30.4153V39.2103L20.8541 41L19.8458 40.3605C19.3276 40.0318 18.7412 39.8033 18.0707 39.6807L18.0653 39.6797L18.0599 39.6787C17.3827 39.5498 16.3154 39.4716 14.802 39.4716H1.14354L0 36.4056L12.6788 18.892H8.10058C6.88868 18.892 6.33541 19.0418 6.16445 19.1333L6.15 19.141L6.13537 19.1484L6.13325 19.1498C6.13159 19.1509 6.12782 19.1537 6.12205 19.159C6.11068 19.1694 6.08823 19.1926 6.05861 19.2368C5.99726 19.3286 5.91563 19.4953 5.84442 19.7747ZM27.4419 6.84424H24.7139L23.6047 3.79585L24.3362 3.17193C25.4042 2.26104 26.614 1.51283 27.958 0.925366L27.9647 0.922422L27.9715 0.919541C29.3254 0.343314 30.6236 0 31.8274 0C32.6363 0 33.4041 0.26119 34.006 0.833816C34.6079 1.40644 34.8824 2.1369 34.8824 2.90646V16.3025C35.3262 15.8505 35.805 15.4269 36.3188 15.0321C38.2425 13.5539 40.3518 12.7509 42.6186 12.7509C45.2905 12.7509 47.5375 13.5093 48.8996 15.3593C50.1908 17.0694 50.6997 19.608 50.6997 22.6891V34.0337C50.6997 34.1114 50.7041 34.1733 50.7099 34.2212C51.0875 34.2186 51.5808 34.0713 52.2127 33.5663L53.4238 32.5984L56 35.9523L55.2004 36.8008C54.253 37.806 53.2107 38.6265 52.0691 39.2419C50.9315 39.8552 49.7605 40.2216 48.5809 40.2216C46.9306 40.2216 45.4303 39.7287 44.474 38.4651C43.6051 37.317 43.3085 35.681 43.3085 33.8462V22.6891C43.3085 21.1596 42.9955 20.3257 42.6469 19.9112L42.6267 19.8872L42.6077 19.8624C42.3736 19.5576 41.8495 19.2201 40.5491 19.2201C39.5821 19.2201 38.7074 19.5646 37.8728 20.3794C37.0299 21.2346 36.2875 22.5138 35.7077 24.3101C35.1652 26.0919 34.8824 28.1714 34.8824 30.5647C34.8824 31.9808 34.995 33.0234 35.1832 33.7395C35.3641 34.428 35.69 35.1108 36.1811 35.7904L37.442 37.3898L35.6914 39.4716H25.3138L23.8722 35.6066L26.5056 35.0101C26.5061 35.01 26.5065 35.0099 26.507 35.0098C26.8049 34.9416 26.9822 34.8632 27.0794 34.8044C27.1259 34.7762 27.1503 34.7548 27.1612 34.744C27.1667 34.7385 27.1697 34.735 27.1709 34.7334L27.1721 34.7317L27.1801 34.7174L27.1882 34.7037C27.2844 34.541 27.4419 34.0147 27.4419 32.8617V6.84424ZM25.8158 36.612L26.8506 36.3776C26.994 36.3449 27.129 36.3078 27.2554 36.2664C27.8527 36.0711 28.2598 35.78 28.4766 35.3932C28.7723 34.8931 28.9201 34.0493 28.9201 32.8617V6.46922C28.9201 6.09419 28.838 5.82854 28.6737 5.67228C28.5423 5.51602 28.296 5.43789 27.9346 5.43789H25.7665L25.323 4.21905C26.2757 3.4065 27.3597 2.73457 28.5752 2.20328C29.8235 1.672 30.9075 1.40635 31.8274 1.40635C32.2872 1.40635 32.665 1.54699 32.9607 1.82826C33.2563 2.10953 33.4042 2.46893 33.4042 2.90646V21.1421C33.8035 20.1923 34.2963 19.321 34.8824 18.5283C35.5498 17.6257 36.3382 16.825 37.2476 16.1262C38.9558 14.8136 40.7462 14.1573 42.6186 14.1573C45.0167 14.1573 46.7085 14.8292 47.694 16.173C48.7123 17.5169 49.2215 19.6889 49.2215 22.6891V34.0337C49.2215 35.0963 49.7142 35.6276 50.6997 35.6276C51.3074 35.6276 51.9151 35.4479 52.5227 35.0886C52.7363 34.9623 52.9499 34.8138 53.1635 34.6431L54.0997 35.8619C53.2456 36.7683 52.3258 37.4871 51.3403 38.0184C50.3548 38.5496 49.435 38.8153 48.5809 38.8153C47.2341 38.8153 46.265 38.4246 45.6737 37.6433C45.0824 36.862 44.7867 35.5963 44.7867 33.8462V22.6891C44.7867 21.0328 44.4582 19.8139 43.8012 19.0326C43.1771 18.2201 42.093 17.8138 40.5491 17.8138C39.1365 17.8138 37.8882 18.3451 36.8041 19.4076C35.7529 20.4702 34.9153 21.9703 34.2911 23.908C33.6998 25.8456 33.4042 28.0645 33.4042 30.5647C33.4042 32.0335 33.5191 33.2055 33.7491 34.0806C33.979 34.9556 34.3897 35.7994 34.981 36.612L35.5723 37.3621L34.981 38.0652H26.3578L25.8158 36.612Z"
        fill={fill}
      />
    </svg>
  );
};

export default ZHLogo;