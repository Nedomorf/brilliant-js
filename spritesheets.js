const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

let startSprite;
let middleSprite;
let finishSprite;

function preload() {

    game.load.spritesheet('start', 'assets/bri_big_anim_start.png', 392, 370);
    game.load.spritesheet('middle', 'assets/bri_big_anim_middle.png', 449, 430);
    game.load.spritesheet('finish', 'assets/bri_big_anim_finish.png', 325, 335);

}

function create() {

    startSprite = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'start');
    startSprite.anchor.set(0.5, 0.5);
    startSprite.animations.add('scalePos');

    startSprite.animations.play('scalePos', 8, false, true);

    startSprite.scale.x -= 1;
    startSprite.scale.y -= 1;

    startSprite.animations.currentAnim.onComplete.addOnce(() => {
        middleSprite = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'middle');
        middleSprite.anchor.set(0.5, 0.5);
        middleSprite.animations.add('loop');
        middleSprite.animations.currentAnim.name = 'loop';
        middleSprite.animations.currentAnim.loop = true;
        middleSprite.animations.currentAnim.speed = 8;
        middleSprite.animations.currentAnim.killOnComplete = true;
        middleSprite.animations.currentAnim.play();
        setTimeout(() => {
            middleSprite.animations.currentAnim.loop = false;
            middleSprite.animations.currentAnim.onComplete.addOnce(() => {
                finishSprite = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'finish');
                finishSprite.anchor.set(0.5, 0.5);
                finishSprite.animations.add('scaleNeg');
                finishSprite.animations.play('scaleNeg', 8, false, true);
                game.add.tween(finishSprite).to({ x: window.innerWidth/3, y: 150 }, 500, Phaser.Easing.Linear.None, true);
            })
        }, 1000)
    })



}

function update() {

    startSprite.scale.x += 0.035;
    startSprite.scale.y += 0.035;


    if (finishSprite) {
        finishSprite.scale.x -= 0.02;
        finishSprite.scale.y -= 0.02;
    }

}