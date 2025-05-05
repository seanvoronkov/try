document.addEventListener('DOMContentLoaded', () => {
    const baseTimesMen = {
        'freestyle': {
            '50': 20.91, '100': 46.86, '200': 102.00,
            '400': 220.07, '800': 452.12, '1500': 871.02
        },
        'backstroke': {
            '50': 23.71, '100': 51.60, '200': 111.92
        },
        'breaststroke': {
            '50': 25.95, '100': 56.88, '200': 126.12
        },
        'butterfly': {
            '50': 22.27, '100': 49.45, '200': 110.73
        },
        'medley': {
            '200': 114.00, '400': 243.84
        }
    };

    const baseTimesWomen = {
        'freestyle': {
            '50': 23.67, '100': 51.71, '200': 112.98,
            '400': 236.46, '800': 484.79, '1500': 932.98
        },
        'backstroke': {
            '50': 26.98, '100': 57.45, '200': 123.35
        },
        'breaststroke': {
            '50': 29.16, '100': 64.13, '200': 139.11
        },
        'butterfly': {
            '50': 24.43, '100': 55.48, '200': 121.81
        },
        'medley': {
            '200': 126.12, '400': 266.36
        }
    };

    const poolConversion = {
        'freestyle': {
            '50': 0.8, '100': 1.6, '200': 3.2,
            '400': 6.4, '800': 12.8, '1500': 24.0
        },
        'backstroke': {
            '50': 0.9, '100': 1.8, '200': 3.6
        },
        'breaststroke': {
            '50': 0.7, '100': 1.4, '200': 2.8
        },
        'butterfly': {
            '50': 0.8, '100': 1.6, '200': 3.2
        },
        'medley': {
            '200': 3.2, '400': 6.4
        }
    };

    const calculateBtn = document.getElementById('calculate');
    const pointsDisplay = document.getElementById('points');

    calculateBtn.addEventListener('click', () => {
        const stroke = document.getElementById('stroke').value;
        const distance = document.getElementById('distance').value;
        const gender = document.getElementById('gender').value;
        const poolLength = document.getElementById('poolLength').value;
        
        const minutes = parseInt(document.getElementById('minutes').value || 0);
        const seconds = parseInt(document.getElementById('seconds').value || 0);
        const milliseconds = parseInt(document.getElementById('milliseconds').value || 0);
        
        let timeInSeconds = minutes * 60 + seconds + milliseconds / 100;
        
        // Adjust time for short course
        if (poolLength === 'short') {
            timeInSeconds -= poolConversion[stroke][distance];
        }

        const baseTime = gender === 'male' ? 
            baseTimesMen[stroke][distance] : 
            baseTimesWomen[stroke][distance];

        const points = Math.round((baseTime / timeInSeconds) ** 3 * 1000);

        // Animate points display
        animatePoints(points);
    });

    function animatePoints(targetPoints) {
        const duration = 1500;
        const start = parseInt(pointsDisplay.textContent) || 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentPoints = Math.round(start + (targetPoints - start) * easeOut);

            pointsDisplay.textContent = currentPoints;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Update available distances based on stroke
    document.getElementById('stroke').addEventListener('change', updateDistances);

    function updateDistances() {
        const stroke = document.getElementById('stroke').value;
        const gender = document.getElementById('gender').value;
        const distances = Object.keys(gender === 'male' ? 
            baseTimesMen[stroke] : baseTimesWomen[stroke]);
        
        const distanceSelect = document.getElementById('distance');
        distanceSelect.innerHTML = distances.map(distance => 
            `<option value="${distance}">${distance} מטר</option>`
        ).join('');
    }
});