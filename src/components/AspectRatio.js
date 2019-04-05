import React,  {Component} from 'react';
import '../styles/AspectRatio.scss';


class AspectRatio extends Component {
    state = {
        width: 0,
        height: 0
    };

    resize = () => {

        const {widthRatio, heightRatio} = this.props;
        const maxHeight = this.container.clientHeight - 20;
        const maxWidth = this.container.clientWidth - 20;

        let width = maxWidth;
        let height = maxWidth * heightRatio / widthRatio;

        if (height > maxHeight) {
            height = maxHeight;
            width = maxHeight * widthRatio / heightRatio;
        }

        this.setState({ width, height });
    };

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {

        return <div className='aspect-ratio'
                    ref={ (container) => this.container = container}>
            <div className="aspect-ratio-content" style={{width: this.state.width, height: this.state.height}}>
                {this.props.children}
            </div>
        </div>;
    }
}

export default AspectRatio;