import React, { useEffect, useState } from 'react';
import { PieChart, BarChart } from '@mui/x-charts';

const ProductPieChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const getCategories = () => {
        const categories = {};
        data.forEach((product) => {
            if (categories[product.category]) {
                categories[product.category] += 1;
            } else {
                categories[product.category] = 1;
            }
        });

        return categories;
    };

    const totalProducts = data.length;
    const categories = getCategories();

    const pieChartData = Object.entries(categories).map(([category, count]) => ({
        label: category,
        value: ((count / totalProducts) * 100)
    }));

    const barChartData = Object.values(categories);
    const barChartLabels = Object.keys(categories);

    return (
        <div>
            {loading ? (<div> Loading ... </div>) : (
                <div className='dashboard flex'>
                    <div>
                        <PieChart
                            series={[
                                {
                                    data: pieChartData
                                }
                            ]}
                            width={600}
                            height={300}
                        />
                        <h4>
                            Percentage Product Distribution per Category
                        </h4>
                    </div>


                    <div>
                        <BarChart
                            width={500}
                            height={300}
                            series={[
                                { data: barChartData, label: 'Product Count' },
                            ]}
                            xAxis={[{ data: barChartLabels, scaleType: 'band' }]}
                        />
                        <h4>
                            Product Count per category
                        </h4>
                    </div>


                </div>
            )}
        </div>
    );
};

export default ProductPieChart;