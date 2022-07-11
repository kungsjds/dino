document.addEventListener('DOMContentLoaded', () => {

    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const alert = document.getElementById('alert');
    const score = document.getElementById('score');

    let jumping = false;
    let gravity = 0.9;
    let game_over = false;
    let dino_py = 0;
    let points = 0;
    score.innerHTML = 'Score:' + points;

    document.addEventListener('keydown', jumpControl);

    function jumpControl(e) {

        if (e.keyCode == 32 && !jumping) {

            jumping = true;
            jump();

        };

    };

    let count = 0;
    let upTimerId;
    let downTimerId;
    function jump() {

        upTimerId = setInterval(up, 20);

    };

    function up() {

        if (count == 15) {
            clearInterval(upTimerId);
            downTimerId = setInterval(down, 20);
        };

        dino_py += 30;
        count++;
        dino_py = dino_py * gravity;
        dino.style.bottom = dino_py + 'px';

    };

    function down() {

        if (count == 0) {
            clearInterval(downTimerId);
            jumping = false;
        };

        dino_py -= 5;
        count--;
        dino_py = dino_py * gravity;
        dino.style.bottom = dino_py + 'px';

    };

    function generateObst() {

        // Random numb from 0 to 4000
        let randomTime = Math.random()*4000+20;
        let obstacle_px = 1000;
        const obstacle = document.createElement('div');

        // Create obstacle copy
        if (!game_over) obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstacle_px + 'px';

        let timerId = setInterval(function () {

            if (obstacle_px > 0 && obstacle_px < 60 && dino_py < 60) {
                clearInterval(timerId);
                alert.innerHTML = 'Game Over!';
                game_over = true;

                // Delete copies
                body.removeChild(body.firstChild);
                while(grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                };
            }
            else if (obstacle_px > 0 && obstacle_px < 60 && dino_py > 60){
                // let points = ;

                points += 1;

                score.innerHTML = 'Score: ' + points;
            };

            obstacle_px -= 10;
            obstacle.style.left = obstacle_px + 'px';

        }, 20)

        // Recursive function. Call itself in a random time until the game_over get true.
        if (!game_over) setTimeout(generateObst, randomTime);

    };
    generateObst();

});