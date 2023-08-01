import {Component} from 'react';
import './Rank.css';

class Rank extends Component {
    render() {
        const {name, entries} = this.props;

        return (
            <div>
                <div className='white f3'>
                    {`${name} your current Rank is`}
                </div> 
                <div className='white f1'>
                    {`#${entries}`}
                </div> 
            </div>
        );
    }
}

export default Rank;