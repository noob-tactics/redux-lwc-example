import { LightningElement,wire, api,track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import conf from '@salesforce/resourceUrl/confetti';
import {loadScript} from 'lightning/platformResourceLoader';

export default class CelebrateStage extends LightningElement {
    
    
    @api recordId;
    @api objectApiName;
    @track fieldName
    @api fieldValue='';

    //confetti configs
    @api colors = ['#FFFFFF', '#1798c1'];
    @api duration = 5;
    @api mode ='parade';


    connectedCallback(){

        if(this.objectApiName=='Case'){
          this.fieldName = 'Case.Status';
          if(this.fieldValue==''){
            this.fieldValue = 'Closed';
          }
        }else if(this.objectApiName=='Opportunity'){
          this.fieldName = 'Opportunity.StageName';
          if(this.fieldValue==''){
            this.fieldValue = 'Closed Won';
          }
        }

        loadScript(this, conf + '/confetti.js')
        .then(() => {
         console.log('loaded success');
         console.log('fieldvalue11', this.fieldValue);
        })
        .catch(error => {
          console.log('error', error);
        });

    }

    @wire(getRecord, { recordId: '$recordId', fields: '$fieldName' })
    getValue({ error, data }){

      if (data) { //if the wiring was successfull and the data was returned
        console.log('data', JSON.stringify(data));
        console.log('fieldvalue', this.fieldValue);
        if(this.objectApiName=='Case'){
          if(data.fields.Status.value == this.fieldValue){
            this.initConfetti();
          }
        }else if(this.objectApiName=='Opportunity'){
          if(data.fields.StageName.value == this.fieldValue){
            this.initConfetti();
          }
        }

        } else if (error) {
            this.error = error;
            console.log('Error while wiring getValue : ', error);
        }


    }

    initConfetti(){
      if(this.mode =='parade'){
        this.parade();
      }else if(this.mode=='basic'){
        this.basicConfetti();
      }else if(this.mode=='random direction'){
        this.randomDirection();
      }else if(this.mode=='realistic'){
        this.realistic();
      }else if(this.mode=='fireworks'){
        this.fireworks();
      }else if(this.mode=='snow'){
        this.snow();
      }
      
    }

    parade() {
      var end = Date.now() + (this.duration * 1000);

      
      var colors = ['#FFFFFF', '#1798c1'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }

    basicConfetti(){
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    realistic(){
      this.fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      this.fire(0.2, {
        spread: 60,
      });
      this.fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      this.fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      this.fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }

    fireworks(){
      var totalDuration = this.duration * 1000;
      var animationEnd = Date.now() + totalDuration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / totalDuration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }

    snow(){
      var totalDuration = this.duration * 1000;
      var animationEnd = Date.now() + totalDuration;
      var skew = 1;

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      (function frame() {
        var timeLeft = animationEnd - Date.now();
        var ticks = Math.max(200, 500 * (timeLeft / totalDuration));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
          particleCount: 2,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: Math.random(),
            // since particles fall down, skew start toward the top
            y: (Math.random() * skew) - 0.2
          },
          colors: ['#FFFFFF', '#1798c1'],
          shapes: ['circle'],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.4, 1),
          drift: randomInRange(-0.4, 0.4)
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        }
      }());
    }

    randomDirection(){
      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
       confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 }
      });
    }

    fire(particleRatio, opts) {
      var count = 200;
      var defaults = {
        origin: { y: 0.7 }
      };
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

}