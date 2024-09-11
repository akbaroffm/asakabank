import Plyr from 'plyr';
import { string } from 'prop-types';
import { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'plyr/dist/plyr.css';
const Styles = createGlobalStyle`
   :root {
      --plyr-color-main: #e41d32 !important;
      --plyr-control-radius: 8px !important;
   }
`;
const StyledElement = styled.div`
  & .plyr {
    -moz-border-radius: 20px !important;
    -ms-border-radius: 20px !important;
    -o-border-radius: 20px !important;
    -webkit-border-radius: 20px !important;
    border-radius: 16px !important;
    font-family: 'Acrom', sans-serif;
    font-weight: 500 !important;
    overflow: hidden !important;
    & .plyr__controls {
      justify-content: flex-start;
      padding: 20px 10px 10px 10px;
      & .plyr__controls__item:first-child {
        margin: 0;
      }
      & .plyr__controls__item.plyr__progress__container {
        left: 0;
        margin: 0;
        padding: 0 10px;
        position: absolute;
        top: 0;
        width: 100%;
      }
      & .plyr__progress input[type='range'],
      & .plyr__volume input[type='range'] {
        cursor: pointer;
        &::-webkit-slider-runnable-track {
          border-radius: 2px;
          height: 3px;
        }
        &::-webkit-slider-thumb {
          border-radius: 50%;
          height: 12px;
          width: 12px;
        }
      }
      & .plyr__time {
        font-family: 'Acrom', sans-serif !important;
        font-size: 15px !important;
        font-weight: 500;
      }
      & .plyr__time--current {
        margin: 0 auto 0 0;
      }
    }
    & .plyr__poster {
      background-size: cover;
    }
  }
`;
const Video = ({ source }) => {
  const ref = useRef(null);
  const player = useRef(null);
  const url = new URLSearchParams(
    String(source).replace('https://www.youtube.com/watch', '')
  ).get('v');
  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng') || 'uz';
    const defaultOptions = {
      controls: [
        'play-large',
        'play',
        'mute',
        'current-time',
        'progress',
        'duration',
        'airplay',
        'capture',
        'volume',
        'settings',
        'fullscreen',
      ],
      settings: ['quality', 'speed'],
      speed: {
        selected: 1,
        options: [0.5, 1, 1.5, 2],
      },
      ratio: '16:9',
      i18n: {
        normal: lang === 'uz' ? 'Normal' : 'Нормальный',
        quality: lang === 'uz' ? 'Tasvir sifati' : 'Качество',
        speed: lang === 'uz' ? 'Tasvir tezligi' : 'Скорость',
      },
    };
    player.current = new Plyr(ref.current, defaultOptions);
  }, [url]);
  return (
    <StyledElement>
      <div
        ref={ref}
        data-plyr-provider="youtube"
        data-plyr-embed-id={url}
      ></div>
      <Styles />
    </StyledElement>
  );
};
Video.defaultProps = { source: '' };
Video.propTypes = { source: string };
export default Video;
