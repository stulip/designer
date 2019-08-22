/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React, {PureComponent} from "react";
import ReactRuler from "mb-sketch-ruler";

const thick = 16;

export class Rules extends PureComponent {
    state = {
        scale: 2, //658813476562495, //1,
        startX: 0,
        startY: 0,
        isShowRuler: true,
        isShowReferLine: true,
        lines: {
            h: [100, 200],
            v: [100, 200]
        }
    };

    componentDidMount() {
        // 滚动居中
        this.$app.scrollLeft = this.$container.getBoundingClientRect().width / 2 - 300; // 300 = #screens.width / 2
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.scale !== prevState.scale) {
            this.handleScroll();
        }
    }

    setAppRef = ref => (this.$app = ref);
    setContainerRef = ref => (this.$container = ref);

    handleScroll = () => {
        const screensRect = document.querySelector("#screens").getBoundingClientRect();
        const canvasRect = document.querySelector("#canvas").getBoundingClientRect();

        // 标尺开始的刻度
        const { scale } = this.state;
        const startX = (screensRect.left + thick - canvasRect.left) / scale;
        const startY = (screensRect.top + thick - canvasRect.top) / scale;
        this.setState({ startX, startY });
    };
    handleWheel = e => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const nextScale = parseFloat(Math.max(0.2, this.state.scale - e.deltaY / 500).toFixed(2));
            this.setState({ scale: nextScale });
        }
    };
    handleLine = lines => {
        this.setState({ lines });
    };

    handleShowReferLine = ()=> {
        this.setState({isShowReferLine: !this.state.isShowReferLine});
    };

    handleShowRuler = ()=> {
        this.setState({isShowRuler: !this.state.isShowRuler});
    };

    handleCornerClick = ()=> {
        console.log('Corner Click');
    };

    render() {
        const { scale, startX, startY, lines, isShowRuler, isShowReferLine } = this.state;
        const { h, v } = lines;

        const rectWidth = 160;
        const rectHeight = 200;

        const canvasStyle = {
            width: rectWidth,
            height: rectHeight,
            transform: `scale(${scale})`
        };
        const shadow = {
            x: 0,
            y: 0,
            width: rectWidth,
            height: rectHeight
        };

        return (
            <div className="wrapper">
                <div className="scale-value">{`scale: ${scale}`}</div>
                <ReactRuler
                    thick={thick}
                    scale={scale}
                    width={582}
                    height={482}
                    startX={startX}
                    startY={startY}
                    shadow={shadow}
                    horLineArr={h}
                    verLineArr={v}
                    isShowRuler={isShowRuler}
                    isShowReferLine={isShowReferLine}
                    handleLine={this.handleLine}
                    handleShowRuler={this.handleShowRuler}
                    handleShowReferLine={this.handleShowReferLine}
                    cornerActive={true}
                    onCornerClick={this.handleCornerClick}
                />
                <div ref={this.setAppRef} id="screens" onScroll={this.handleScroll} onWheel={this.handleWheel}>
                    <div ref={this.setContainerRef} className="screen-container">
                        <div id="canvas" style={canvasStyle} />
                    </div>
                </div>
            </div>
        );
    }
}
