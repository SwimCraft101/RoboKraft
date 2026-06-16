namespace SpriteKind {
    export const Block = SpriteKind.create()
}
let player2: Sprite = null
let workingBlockPosition: tiles.Location = null
// The world is defined top to bottom starting on the left. The world height is controlled by worldHeight but should NOT be modified at runtime.
let world = [
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
1,
2,
2,
3,
3,
3,
3,
3,
3,
3,
3,
3,
3,
3,
3,
4
]
let worldHeight = 32
world = world.concat(world)
world = world.concat(world)
world = world.concat(world)
world = world.concat(world)
world = world.concat(world)
world = world.concat(world)
info.setLife(20)
scene.cameraFollowSprite(player2)
tiles.setCurrentTilemap(tilemap`overworld`)
game.onUpdateInterval(500, function () {
    for (let index = 0; index <= world.length - 1; index++) {
        workingBlockPosition = tiles.getTileLocation(Math.trunc(index / worldHeight), index % worldHeight)
        switch(world[index]) {
            case 0: //air
                tiles.setTileAt(workingBlockPosition, assets.tile`transparency16`)
                break
            case 1: //grass
                tiles.setTileAt(workingBlockPosition, assets.tile`grass`)
                break
            case 2: //dirt
                tiles.setTileAt(workingBlockPosition, assets.tile`missingTexture`)
                break
            case 3: //stone
                tiles.setTileAt(workingBlockPosition, assets.tile`missingTexture`)
                break
            case 4: //bedrock
                tiles.setTileAt(workingBlockPosition, assets.tile`missingTexture`)
                break
            default:
                tiles.setTileAt(workingBlockPosition, assets.tile`missingTexture`)
                break
        }
    }
})
