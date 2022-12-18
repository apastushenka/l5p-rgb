import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Color } from './color';
import { init, load } from './config';
import { EffectState } from './effect';
import './style.css';

const DEFAULT_BRIGHTNESS = 1;
const DEFAULT_SPEED = 1;
const DEFAULT_DIRECTION = 'ltr';

const DEFAULT_COLOR: Color = [
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
];

const DEFAULT_STATE: EffectState = {
  current: 'static',
  static: {
    color: DEFAULT_COLOR,
    brightness: DEFAULT_BRIGHTNESS,
  },
  breath: {
    color: DEFAULT_COLOR,
    brightness: DEFAULT_BRIGHTNESS,
    speed: DEFAULT_SPEED,
  },
  wave: {
    brightness: DEFAULT_BRIGHTNESS,
    speed: DEFAULT_SPEED,
    direction: DEFAULT_DIRECTION,
  },
  smooth: {
    brightness: DEFAULT_BRIGHTNESS,
    speed: DEFAULT_SPEED,
  },
};

async function loadState() {
  try {
    await init();
    return await load();
  }
  catch {
    return DEFAULT_STATE;
  }
};

loadState().then(state => {
  const container = document.getElementById('root');
  const root = createRoot(container!);

  root.render(
    <FluentProvider theme={teamsLightTheme}>
      <App state={state} />
    </FluentProvider>
  );
});