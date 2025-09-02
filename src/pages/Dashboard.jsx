import { Pie, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement)

export default function Dashboard() {
    const priceData = {
        labels: ['Art', 'Baby', 'Classic', 'Outdoor', 'Educational'],
        datasets: [{
            label: 'Average Price',
            data: [25, 15, 40, 30, 20],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
        }]
    }

    const inventoryData = {
        labels: ['Art', 'Baby', 'Classic', 'Outdoor', 'Educational'],
        datasets: [{
            label: 'In Stock %',
            data: [80, 50, 90, 60, 70],
            backgroundColor: ['#f00', '#0f0', '#00f', '#ff0', '#0ff'],
        }]
    }

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Random Sales',
            data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
            borderColor: 'blue',
            backgroundColor: 'lightblue',
        }]
    }

    return (
            <section>
                <h1>Dashboard</h1>
                <div style={{ width: '400px' }}><h3>Prices per Label</h3><Bar data={priceData} /></div>
                <div style={{ width: '400px' }}><h3>Inventory by Label</h3><Pie data={inventoryData} /></div>
                <div style={{ width: '400px' }}><h3>Sales Over Time</h3><Line data={lineData} /></div>
            </section>

    )
}
