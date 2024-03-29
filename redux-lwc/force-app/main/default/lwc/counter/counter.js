import { LightningElement } from 'lwc';
import { Redux } from 'c/lwcRedux';
import {increment, decrement, reset} from 'c/counterActions';

export default class Counter extends Redux(LightningElement) {

    mapStateToProps(state){
        return {counter: state.counter};
    }
    mapDispatchToProps(){
        return {increment, decrement, reset};
    }

    connectedCallback(){
        console.log('Example line');

        if(this.props.counter > 0){
            console.log(this.props.counter);
        }

        

    }
}