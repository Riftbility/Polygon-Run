namespace SpriteKind {
    export const OverLap = SpriteKind.create()
    export const Kings_Chest = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorLight0, function (sprite, location) {
    King.sayText("Stop that peaseant!!", 1000, false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile72`, function (sprite, location) {
    myenemy.sayText("You were made for that cell! *Har-Har-Har*")
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`WalkForward_You`,
    200,
    true
    )
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    King,
    assets.animation`King_Animation`,
    100,
    true
    )
    animation.runImageAnimation(
    myenemy,
    assets.animation`Soldier_Animation`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile46`, function (sprite, location) {
    myenemy.sayText("They're going to the other room!", 1000, false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile33`, function (sprite, location) {
    game.gameOver(true)
    myenemy.sayText("DON\"T TOUCH THAT CHEST!!!")
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`WalkLeft_You`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile147`, function (sprite, location) {
    myenemy.sayText("Get out of the ThroneRoom!!!")
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile140`, function (sprite, location) {
    King.sayText("They're ruining my wood!!!")
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile40`, function (sprite, location) {
    myenemy.sayText("They're going to the other room!", 1000, false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`WalkRight_You`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    myenemy.sayText("HOW ARE YOU DOING THAT???")
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 1, 255, 0, 516, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    scene.cameraShake(6, 500)
    myenemy.sayText("En Garde!")
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`WalkDown_You`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    myenemy.sayText("They're stealing the goods!")
    King.sayText("You may take our lives, but you'll never take our TREASURE!!!")
    info.changeScoreBy(1)
    sprites.destroy(Treasure)
    info.changeCountdownBy(4)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile78`, function (sprite, location) {
    King.sayText("You'll dirty my Carpet!!!!")
})
info.onScore(8, function () {
    mySprite.sayText("I NEED TO GET THAT CHEST!!!", 5000, true)
    mySprite.startEffect(effects.warmRadial, 900000)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
    King.sayText("We Go Together. ")
    myenemy.sayText("THEY'RE IN THE WALLS!!!")
    mySprite.setFlag(SpriteFlag.GhostThroughWalls, true)
    King.changeScale(1, ScaleAnchor.Middle)
    controller.moveSprite(King, 200, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -1
    info.changeLifeBy(-1)
    info.changeCountdownBy(-1)
    pause(100)
})
let Treasure: Sprite = null
let myenemy: Sprite = null
let King: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
game.splash("Polygon Run")
mySprite = sprites.create(assets.image`You`, SpriteKind.Player)
statusbar = statusbars.create(10, 2, StatusBarKind.Health)
statusbar.setColor(7, 2)
statusbar.attachToSprite(mySprite, 0, 5)
statusbar.setStatusBarFlag(StatusBarFlag.IgnoreValueEvents, true)
statusbar.setLabel("HP")
statusbar.max = 16
tiles.setCurrentTilemap(tilemap`Dungeon_Polygon_Run`)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.setWallAt(tiles.getTileLocation(32, 7), true)
tiles.setWallAt(tiles.getTileLocation(31, 7), true)
tiles.setWallAt(tiles.getTileLocation(30, 7), true)
tiles.setWallAt(tiles.getTileLocation(29, 7), true)
info.startCountdown(90)
info.setLife(16)
info.setScore(0)
// Set tempo for the song
music.setTempo(140)
game.onUpdateInterval(5000, function () {
    Treasure = sprites.create(assets.image`Treasure`, SpriteKind.Food)
    Treasure.setPosition(randint(0, 160), randint(0, 120))
})
game.onUpdateInterval(1000, function () {
    animation.runImageAnimation(
    Treasure,
    assets.animation`Treasure_Animation`,
    500,
    true
    )
})
game.onUpdateInterval(90000, function () {
    King = sprites.create(assets.image`King`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(King, assets.tile`myTile33`)
    King.follow(mySprite, 75)
    King.setBounceOnWall(true)
})
forever(function () {
    // Set the tempo for the song
    music.setTempo(200)
    // Intro Section (Lead melody alternates with bassline)
    // Lead melody
    music.playMelody("E G F G E G F G ", 200)
    // Bassline
    music.playMelody("C E G C E G C E ", 200)
    // Lead melody
    music.playMelody("A G F E F G A B ", 200)
    // Bassline
    music.playMelody("E C G E C G E C ", 200)
    // Lead melody
    music.playMelody("C5 B A G F E D C ", 200)
    // Bassline
    music.playMelody("G E C G E C G E ", 200)
    // Main Theme (Rapid alternation between melody and bass)
    // Lead melody
    music.playMelody("E G A G F G E F ", 200)
    // Bassline
    music.playMelody("C E G C E G C E ", 200)
    // Lead melody
    music.playMelody("F G A B A G F G ", 200)
    // Bassline
    music.playMelody("E C A E C A E C ", 200)
    // Lead melody
    music.playMelody("E F G A G F E D ", 200)
    // Bassline
    music.playMelody("G E C G E C G E ", 200)
    // Secondary Theme (Dramatic harmony simulation)
    // Slightly slower for variation
    music.setTempo(180)
    // Lead melody
    music.playMelody("G E F G A G F E ", 180)
    // Bassline
    music.playMelody("C E G C E G C E ", 180)
    // Lead melody
    music.playMelody("E F G A B A G F ", 180)
    // Bassline
    music.playMelody("E C A E C A E C ", 180)
    // Lead melody
    music.playMelody("C5 B A G F G A B ", 180)
    // Bassline
    music.playMelody("C G C G C G C G ", 180)
    // Bridge (Buildup with layered effect)
    // Gradually increase tempo again
    music.setTempo(190)
    // Lead melody
    music.playMelody("C D E F G A G F ", 190)
    // Bassline
    music.playMelody("C E G C E G C E ", 190)
    // Lead melody
    music.playMelody("E F G A B C5 B A ", 190)
    // Bassline
    music.playMelody("C E A C E A C E ", 190)
    // Finale (High-energy, dramatic layered effect)
    // Speed up for climax
    music.setTempo(220)
    // Lead melody
    music.playMelody("G E F G A G F E ", 220)
    // Bassline
    music.playMelody("C G E C G E C G ", 220)
    // Lead melody
    music.playMelody("E F G A B C5 B A ", 220)
    // Bassline
    music.playMelody("C E A C E A C E ", 220)
    // Lead melody
    music.playMelody("C5 B A G F G A B ", 220)
    // Bassline
    music.playMelody("C G C G C G C G ", 220)
    // Lead melody
    music.playMelody("C5 D E F G F E D ", 220)
    // Bassline
    music.playMelody("E C G E C G E C ", 220)
})
game.onUpdateInterval(20000, function () {
    myenemy = sprites.create(assets.image`Soldier`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(myenemy, assets.tile`myTile140`)
    myenemy.follow(mySprite, 50)
    myenemy.setBounceOnWall(true)
})
game.onUpdateInterval(8000, function () {
    myenemy.sayText("For Kin, and Country!!!")
})
game.onUpdateInterval(8000, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
})
game.onUpdateInterval(10000, function () {
    King.sayText("FREEDOM!!!")
})
