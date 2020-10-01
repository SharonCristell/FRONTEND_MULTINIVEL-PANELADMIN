import React, { Component } from 'react';
import  { Form, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../../images/assets/oro.png';
import img2 from '../../images/assets/plata.png';
import img3 from '../../images/assets/zafiro.png';

export default class RangeNext extends Component{
    constructor(props){
        super(props);
        this.state = {
            imgMax: img1,
            imgRangeAct : img2,
            imgRangeNext: img3
        }

    }
    componentDidMount() {
        let dash = this.props.dash;
        if(this.props,dash.proxRange !== null){

        }
        if(this.props.dash.proxRange.idRange === 2) {
            this.setState({
                imgRangeNext : this.state.imgRangeNext = img2
            });
        }
        
    }
    render(){
        return(
            <div >
                <Form >
                    <Form.Label className="content-title">Avance de Rango</Form.Label>
                    
                        <div className="range-img">
                            <p className="range-title"><b>MÁXIMO LOGRO: </b></p>
                            <img src={img1}></img>
                        </div>
                        <div  className="range-img">
                            <p className="range-title"><b>RANGO ACTUAL:</b></p>
                            <img src={img2}></img>
                        </div>
                        <div  className="range-img">
                            <p className="range-title"><b>PRÓXIMO RANGO:</b></p>
                            <img src={img3}></img>
                        </div>
                </Form>
            </div>
        );
    }
}