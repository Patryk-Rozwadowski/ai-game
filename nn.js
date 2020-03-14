import * as tf from '@tensorflow/tfjs';

class NeuralNetwork {
    constructor(a, b, c) {
        this.input_nodes = a;
        this.hidden_nodes = b;
        this.output_nodes = c;
        this.createModel();
    }

    createModel() {
        console.log('Create model');
        this.model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        });
        this.model.add(hidden);
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: 'softmax'
        });
        this.model.add(output);

    }

    predict(inputs) {

        return tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);
            const outputs = ys.dataSync();
            // console.log(outputs);
            return outputs;
        });
    }
}

export default NeuralNetwork;