import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);



export function ToyChart() {
    // const labels = useSelector(storeState => storeState.toyModule.labels)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    
    getLabelPrice()
    function getLabelPrice() {
        let labelsPrice = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (labelsPrice[label]) {
                    // labelsPrice[label] = (+labelsPrice[label] + toy.price)/2
                    labelsPrice[label].push(toy.price)
                } else {
                    labelsPrice[label] = [toy.price]
                }
            })
        })
        for (const toy in labelsPrice) {
            const sum = labelsPrice[toy].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const average = sum / labelsPrice[toy].length;
            labelsPrice[toy] = average
        }
        console.log(labelsPrice)
        return labelsPrice
    }


    const data = {
        labels: Object.keys(getLabelPrice()),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(getLabelPrice()),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(50, 170, 64, 0.2)',
                    'rgba(150, 130, 10, 0.2)',
                    'rgba(75, 100, 50, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(50, 170, 64, 1)',
                    'rgba(150, 130, 10, 1)',
                    'rgba(75, 100, 50, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <section style={{ maxWidth: '60vw', margin: 'auto' }}>
            <Doughnut data={data} />
        </section>
    )
}