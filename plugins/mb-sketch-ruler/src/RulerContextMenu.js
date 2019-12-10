/* eslint-disable no-return-assign */
import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {createPortal} from 'react-dom'
import {i18nObj} from './constant'
// import { StyleMenu } from './styles'
import './styles.pcss'

const SELECT_SVG = <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M1 5.066c0 .211.07.39.212.538L3.346 7.78A.699.699 0 0 0 3.872 8a.69.69 0 0 0 .517-.221l4.39-4.49A.731.731 0 0 0 9 2.753a.717.717 0 0 0-.22-.532A.714.714 0 0 0 8.255 2a.714.714 0 0 0-.524.221l-3.86 3.955L2.26 4.528a.714.714 0 0 0-.524-.221.714.714 0 0 0-.524.221.749.749 0 0 0-.212.538z"
    fill="#415058" fillRule="evenodd"/>
</svg>;

export default class RulerContextMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement('div')
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    document.addEventListener('click', this.closeMenu);
    document.addEventListener('mousedown', this.closeMenuMouse)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeMenuMouse);
    document.removeEventListener('click', this.closeMenu);
    document.body.removeChild(this.el)
  }

  // click事件只响应左键，menu里的每部分的点击事件使用的是click，
  // 所以mousedown只能响应右键，否则内部点击事件失效
  closeMenu = () => {
    const {oncloseMenu} = this.props;
    oncloseMenu()
  };
  closeMenuMouse = (e) => {
    if (e.button !== 2) return;
    this.closeMenu()
  };
  // 显示/影藏 ruler
  onhandleShowRuler = () => {
    const {handleShowRuler} = this.props;
    handleShowRuler()
  };
  // 显示/影藏 参考线
  onhandleShowReferLine = () => {
    const {handleShowReferLine} = this.props;
    handleShowReferLine()
  };
  // 删除横向/纵向参考线
  onhandleShowSpecificRuler = () => {
    const {horLineArr, verLineArr, handleLine, vertical} = this.props;
    const newLines = vertical
      ? {h: horLineArr, v: []}
      : {h: [], v: verLineArr};
    handleLine(newLines);
    this.closeMenu()
  };

  render() {
    const {isShowReferLine, vertical, verLineArr, horLineArr, lang, menuConfigs} = this.props;
    const {left, top} = this.props.menuPosition;
    const isDisabled = (vertical ? !verLineArr.length : !horLineArr.length);

    return (
      createPortal(
        <div
          style={{left: left, top: top}}
          showReferLine={isShowReferLine}
          lang={lang}
          menuConfigs={menuConfigs}
          id="contextMenu"
          className={'mb-rule-menu'}
        >
          <a
            className="menu-content"
            onClick={this.onhandleShowRuler}
          >
            {i18nObj[lang].show_ruler}
            {SELECT_SVG}
          </a>
          <a
            className="menu-content"
            onClick={this.onhandleShowReferLine}
          >
            {i18nObj[lang].show_refer_line}
            {isShowReferLine && SELECT_SVG}
          </a>
          <div className="divider"/>
          <a
            className={`menu-content${isDisabled ? ' disabled' : ''}`}
            onClick={this.onhandleShowSpecificRuler}
          >
            {i18nObj[lang].remove_all}
            {vertical ? i18nObj[lang].horizontal : i18nObj[lang].vertical}
            {i18nObj[lang].refer_line}
          </a>
        </div>, this.el
      )
    )
  }
}

RulerContextMenu.propTypes = {
  vertical: PropTypes.bool,
  menuPosition: PropTypes.object,
  handleShowRuler: PropTypes.func,
  isShowReferLine: PropTypes.bool,
  handleShowReferLine: PropTypes.func,
  horLineArr: PropTypes.array,
  verLineArr: PropTypes.array,
  handleLine: PropTypes.func,
  oncloseMenu: PropTypes.func,
  lang: PropTypes.string,
  menuConfigs: PropTypes.object
};
