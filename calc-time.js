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

    const calculateBtn = document.getElementById('calculateTarget');
    const timeDisplay = document.getElementById('targetTime');

    calculateBtn.addEventListener('click', () => {
        const stroke = document.getElementById('stroke').value;
        const distance = document.getElementById('distance').value;
        const gender = document.getElementById('gender').value;
        const poolLength = document.getElementById('poolLength').value;
        const targetPoints = parseFloat(document.getElementById('targetPoints').value);

        if (!targetPoints || targetPoints < 100 || targetPoints > 1200) {
            alert('אנא הכנס ניקוד בין 100 ל-1200');
            return;
        }

        const baseTime = gender === 'male' ? 
            baseTimesMen[stroke][distance] : 
            baseTimesWomen[stroke][distance];

        // Calculate target time using inverse FINA formula
        let targetTime = baseTime / Math.pow(targetPoints/1000, 1/3);
        
        // Adjust for pool length
        if (poolLength === 'short') {
            targetTime -= poolConversion[stroke][distance];
        }

        // Format time
        const minutes = Math.floor(targetTime / 60);
        const seconds = Math.floor(targetTime % 60);
        const milliseconds = Math.round((targetTime % 1) * 100);

        const formattedTime = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;

        // Animate time display
        animateTimeDisplay(formattedTime);
    });

    function animateTimeDisplay(targetTime) {
        timeDisplay.style.animation = 'none';
        timeDisplay.offsetHeight; // Trigger reflow
        timeDisplay.textContent = targetTime;
        timeDisplay.style.animation = 'fadeInUp 0.5s ease-out';
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