import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import './CustomScrollbars.scss';

class CustomScrollbars extends Component {

    ref = React.createRef();

    getScrollLeft =()=>{
        const scrollbars = this.ref.current;
        return scrollbars.getScrollLeft();
    }
    getScrollTop =()=>{
        const scrollbars = this.ref.current;
        return scrollbars.getScrollTop();
    }

    scrollToBottom = () => {
        if (!this.ref || !this.ref.current) {
            return;
        }
        const scrollbars = this.ref.current;
        const targetScrollTop = scrollbars.getScrollHeight();
        this.scrollTo(targetScrollTop);
    };

    scrollTo = (targetTop) => {
        const { quickScroll } = this.props;
        if (!this.ref || !this.ref.current) {
            return;
        }
        const scrollbars = this.ref.current;
        const originalTop = scrollbars.getScrollTop();
        let iteration = 0;

        const scroll = () => {
            iteration++;
            if (iteration > 30) {
                return;
            }
            scrollbars.scrollTop(originalTop + (targetTop - originalTop) / 30 * iteration);

            if (quickScroll && quickScroll === true) {
                scroll();
            } else {
                setTimeout(() => {
                    scroll();
                }, 20);
            }
        };

        scroll();
    };

    renderTrackHorizontal = (props) => {
        return (
            <div {...props} className="track-horizontal" />
        );
    };

    renderTrackVertical = (props) => {
        return (
            <div {...props} className="track-vertical" />
        );
    };

    renderThumbHorizontal = (props) => {
        return (
            <div {...props} className="thumb-horizontal" />
        );
    };

    renderThumbVertical = (props) => {
        return (
            <div {...props} className="thumb-vertical" />
        );
    };

    renderNone = (props) => {
        return (
            <div />
        );
    };

    render() {
        const { className, disableVerticalScroll, disableHorizontalScroll, children,...otherProps } = this.props;
        return (
            <Scrollbars
                ref={this.ref}
                autoHide={true}
                autoHideTimeout={200}
                hideTracksWhenNotNeeded={true}
                className={className ? className + ' custom-scrollbar' : 'custom-scrollbar'}
                {...otherProps}
                renderTrackHorizontal={disableHorizontalScroll ? this.renderNone : this.renderTrackHorizontal}
                renderTrackVertical={disableVerticalScroll ? this.renderNone : this.renderTrackVertical}
                renderThumbHorizontal={disableHorizontalScroll ? this.renderNone : this.renderThumbHorizontal}
                renderThumbVertical={disableVerticalScroll ? this.renderNone : this.renderThumbVertical}
            >
                {children}
            </Scrollbars>
        );
    }
}

export default CustomScrollbars;