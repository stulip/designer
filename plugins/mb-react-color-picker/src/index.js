import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'

import DropDownColors from './DropDownColors'
import HSVPicker from './HSVPicker'
import RGBInput from './RGBInput'
import HexInput from './HexInput'
import AlphaInput from './AlphaInput'
import {formatHex, hex2rgbaStr, rgb2hex} from './utils/color'
import {stopReactEventPropagation} from './utils/DOM'
// import {StyledColorPicker} from './styles'
import './styles.pcss'

const CLOSE_SVG = <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5.95 4.536l2.828 2.828a1 1 0 0 1-1.414 1.414L4.536 5.95 1.707 8.778A1 1 0 0 1 .293 7.364L3.12 4.536.293 1.707A1 1 0 0 1 1.707.293L4.536 3.12 7.364.293a1 1 0 0 1 1.414 1.414L5.95 4.536z"
    fill="#B8BCBF" fillRule="evenodd"/>
</svg>;

const DUMB_FUNC = () => null;

const defaultPalette = {
  light: {
    bgColor: '#fff',
    tc: '#415058',
    lightTc: '#415058',
    darkTc: '#8d9ea7',
    borderColor: '#dedee4',
    colorBlock: {
      border: 'rgba(0, 0, 0, 0.08)'
    },
    icon: {
      close: {
        hover: '#415058'
      },
      piker: {
        bg: '#fff',
        border: '#8d9ea7'
      },
      drop: {
        tc: '#8D9EA7',
        hover: '#5B6B73'
      },
      select: '#8D9EA7'
    },
    input: {
      bg: '#f6f7f8',
      border: '#f2f2f3',
      hover: {
        border: '#1e98ea'
      }
    },
    menu: {
      bg: '#fff',
      shadow: '0 2px 10px 0 rgba(39,54,78,0.08), 4px 12px 40px 0 rgba(39,54,78,0.1)',
      hover: {
        optionBg: '#f6f7f8',
        tc: '#298df8'
      }
    }
  }
};
export default class ColorPicker extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    onChange: PropTypes.func,
    onConfirm: PropTypes.func,
    applyDidMountSideEffect: PropTypes.func,
    applyWillUnmountSideEffect: PropTypes.func,
    onDragStart: PropTypes.func,
    onClose: PropTypes.func,
    headerText: PropTypes.string,
    children: PropTypes.node,
    colorPanelList: PropTypes.array,
    isExpandFeature: PropTypes.bool,
    onChangeSelect: PropTypes.func,
    currentSelect: PropTypes.string,
    onToogleExpand: PropTypes.func,
    isClickExpand: PropTypes.bool,
    palette: PropTypes.object,
    theme: PropTypes.string
  };

  static defaultProps = {
    applyDidMountSideEffect: DUMB_FUNC,
    applyWillUnmountSideEffect: DUMB_FUNC,
    headerText: '颜色设置',
    palette: defaultPalette['light']
  };

  static getDerivedStateFromProps(props, state) {
    const {hex, alpha} = parseColor(props.color);

    if (hex.toLowerCase() === state.props && alpha === state.alpha) {
      return null
    } else {
      return {
        hex,
        alpha,
      }
    }
  }

  state = {
    hex: null,
    alpha: null
  };

  setContainerRef = ref => this.$container = ref;

  componentDidMount() {
    this.props.applyDidMountSideEffect(this.$container)
  }

  componentWillUnmount() {
    this.props.applyWillUnmountSideEffect(this.$container)
  }

  handleDragStart = e => {
    e.preventDefault();
    if (this.props.onDragStart) {
      this.props.onDragStart(e)
    }
  };

  handleClose = e => this.props.onClose(e);

  handleColorChangeFromExternal = color => {
    const {hex, alpha} = parseColor(color);
    this.hsvConfirm({hex, a: alpha})
  };

  handleRgbChange = rgb => {
    const hex = rgb2hex(rgb);
    const changeFromTransparent = this.state.hex === 'transparent';
    this.hsvConfirm({hex, a: changeFromTransparent ? 1 : this.state.alpha})
  };

  handleHexChange = hexValue => {
    const hex = `#${hexValue}`;
    const changeFromTransparent = this.state.hex === 'transparent';
    this.hsvConfirm({hex, a: changeFromTransparent ? 1 : this.state.alpha})
  };

  hsvChange = ({hex, a}) => {
    const {hex: propsHex} = parseColor(this.props.color);
    if (!hex) hex = this.state.hex;
    if (!a && a !== 0) a = this.state.alpha;

    if (hex === 'transparent' && a === 0) {
      this.props.onChange('transparent')
    } else if (hex === 'transparent' && a !== 0) {
      this.props.onChange(hex2rgbaStr('FFFFFF', a))
    } else {
      this.props.onChange(hex2rgbaStr(hex, propsHex === 'transparent' ? 1 : a))
    }
  };

  hsvConfirm = ({hex, a}) => {
    const {hex: propsHex} = parseColor(this.props.color);
    if (!hex) hex = this.state.hex;
    if (!a && a !== 0) a = this.state.alpha;

    if (hex === 'transparent') {
      this.props.onConfirm('transparent')
    } else {
      this.props.onConfirm(hex2rgbaStr(hex, propsHex === 'transparent' ? 1 : a))
    }
  };

  handleChangeAlpha = a => this.hsvConfirm({hex: this.state.hex, a});

  genOutsideColorPicker = () => {
    const passedOutsideColorPicker = this.props.children;
    return React.cloneElement(passedOutsideColorPicker, {
      hex: this.state.hex,
      alpha: this.state.alpha,
      handleChange: this.hsvConfirm
    })
  };

  render() {
    const {onClose, colorPanelList, isExpandFeature, onChangeSelect, currentSelect, onToogleExpand, isClickExpand, palette} = this.props;
    const {hex, alpha} = this.state;

    const hexValue = hex === 'transparent' ? 'TRANSPARENT' : hex.slice(1);

    let outsideColorPicker;
    if (this.props.children) outsideColorPicker = this.genOutsideColorPicker();

    return (
      <div
        className="--mb--color-picker"
        ref={this.setContainerRef}
        onMouseDown={stopReactEventPropagation}
        onClick={stopReactEventPropagation}
        theme={palette}
      >

        <header className="color-picker-header" onMouseDown={this.handleDragStart}>
          <div className="header-text">{this.props.headerText}</div>
          {
            onClose &&
            <span className="icon" onMouseDown={this.handleClose}>{CLOSE_SVG}</span>
          }
        </header>

        <div className="color-picker-body">
          <HSVPicker
            hex={hex}
            alpha={alpha}
            onChange={this.hsvChange}
            onConfirm={this.hsvConfirm}
            theme={palette}
          >
            {outsideColorPicker}
          </HSVPicker>

          <div className="input-section">
            <HexInput
              hexValue={hexValue}
              handleChange={this.handleHexChange}
              theme={palette}
            />

            <RGBInput
              hex={hex}
              handleChange={this.handleRgbChange}
              theme={palette}
            />

            <AlphaInput
              a={parseInt(alpha * 100)}
              handleChangeAlpha={this.handleChangeAlpha}
              theme={palette}
            />
          </div>

          {
            colorPanelList &&
            <DropDownColors
              colorPanelList={colorPanelList}
              currentSelect={currentSelect}
              handleSelect={this.handleColorChangeFromExternal}
              isExpandFeature={isExpandFeature}
              onToogleExpand={onToogleExpand}
              isClickExpand={isClickExpand}
              onChangeSelect={onChangeSelect}
              theme={palette}
            />
          }
        </div>
      </div>
    )
  }
}

export const parseColor = c => {
  const color = c.trim().toLowerCase(); // keep lower cases hex in the component
  const rgbaExtractor = /^rgba?\((.*)\)$/;

  if (color.match(/transparent/)) {
    return {
      hex: 'transparent',
      alpha: 0
    }
  } else if (color.match(/^#[0-9a-f]{6}$|^#[0-9a-f]{3}$/)) {
    return {
      hex: formatHex(color),
      alpha: 1
    }
  } else if (color.match(rgbaExtractor)) {
    const rgbaStr = rgbaExtractor.exec(color)[1];

    const [r, g, b, a] = rgbaStr.split(',').map(i => i.trim());

    return {
      hex: rgb2hex({
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b),
      }),
      alpha: !a ? 1 : parseFloat(a)
    }
  } else {
    return DEFAULT_COLOR
  }
};

const DEFAULT_COLOR = {
  hex: '#000000',
  alpha: 1
};
