class Calculator{
    
    constructor(){
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number'); 
    }

    clearValues(){
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
    }

    btnPress(){             
        //Ativa método de limpar display        
        calc.clearValues();        
    }
}
 
// Test Browser Support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

//Caso não suporte esta API DE VOZ
var erro = 'ERROR: API  Not Supported';

var mensagem ="";
let result = 0;

let upperValue = mensagem;
let resultValue = result;

let api = 0;

if (window.SpeechRecognition === null) {    
    api=1;

    upperValue = document.querySelector('#upper-number');
    upperValue.textContent = erro;

    resultValue = document.querySelector('#result-number');
    resultValue.textContent = '';

}else{    
    
    var recognizer = new window.SpeechRecognition();  
   
    //Para o reconhecedor de voz, parar de ouvir, e não ficar a por muito tempo;
    recognizer.continuous = false

    recognizer.onresult = function(event){

        for (var i = event.resultIndex; i < event.results.length; i++) {
            if(event.results[i].isFinal){
                
                mensagem = event.results[i][0].transcript;
                               
                var splits = mensagem.split(" ");                
                let n1=0, op='', n2=0;                
               
                for(let i = 0; i< splits.length;i++){    
                    n1 = parseInt(splits[0]);
                    op = splits[1];
                    n2 = parseInt(splits[2]);                
                }
               
                //Faz a multiplicação
                if(op == "x"){
                    result = n1 * n2;                    

                //Faz a divisão                
                }else if(op == "/"){
                    result = n1 / n2;             
                
                //soma e subtração
                }else if(op == "+"){                        
                    result = n1 + n2;
                    
                }else if(op == "-"){    
                    result = n1 - n2;                        
                }   
                
                upperValue = document.querySelector('#upper-number');
                upperValue.textContent = mensagem;
                
                resultValue = document.querySelector('#result-number');
                resultValue.textContent = result;
                
            }else{
                transcription.textContent += event.results[i][0].transcript;
            }
            
        }
    }

    

    document.querySelector("#rect").addEventListener("click",function(){

        try {
            recognizer.start();
        } catch(ex) {
            alert("error: "+ex.message);
        }
    });
}

let calc = new Calculator();
let buttons = document.querySelectorAll('#ac-btn');

if(api == 0){
    for(let i=0; buttons.length > i; i++){
        buttons[i].addEventListener('click', calc.btnPress);
    }
}