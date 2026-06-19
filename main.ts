namespace SpriteKind {
    export const Block = SpriteKind.create()
    export const Cursor = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    light.setAll(0xffff00)
    pause(100)
    light.setAll(0x00ff00)
    if (playerOnGround && controller.up.isPressed()) {
        playerSprite.vy += -95
        playerOnGround = false
    }
    pauseUntil(() => playerOnGround)
    light.setAll(0x000000)
})
function getBlockSprite (blockId: number) {
    if (blockId == 0) {
        return assets.tile`transparency16`
    } else if (blockId == 1) {
        return assets.tile`grass`
    } else if (blockId == 2) {
        return assets.tile`dirt`
    } else if (blockId == 3) {
        return assets.tile`stone`
    } else if (blockId == 4) {
        return assets.tile`bedrock`
    } else if (blockId == 5) {
        return assets.tile`log`
    } else if (blockId == 6) {
        return assets.tile`leaves`
    } else if (blockId == 7) {
        return assets.tile`cobblestone`
    } else if (blockId == 8) {
        return assets.tile`sand`
    } else if (blockId == 9) {
        return assets.tile`gravel`
    } else {
        return assets.tile`missingTexture`
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorSprite.image.equals(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)) {
        cursorSprite.setImage(assets.image`cursor`)
        BlockPreviewOutline.setImage(assets.image`selectedBlockOutline`)
    } else {
        if (controller.down.isPressed()) {
            if (selectedBlock <= 1) {
                selectedBlock = numberOfBlocks
            } else {
                selectedBlock += -1
            }
        } else {
            if (selectedBlock >= numberOfBlocks) {
                selectedBlock = 1
            } else {
                selectedBlock += 1
            }
        }
    }
    blockPreviewSprite.setImage(getBlockSprite(selectedBlock))
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.dx() > 0) {
        if (controller.dy() > 0) {
            movementDirection = MovementDirection.DownRight
        } else if (controller.dy() < 0) {
            movementDirection = MovementDirection.UpRight
        } else {
            movementDirection = MovementDirection.Right
        }
    } else if (controller.dx() < 0) {
        if (controller.dy() > 0) {
            movementDirection = MovementDirection.DownLeft
        } else if (controller.dy() < 0) {
            movementDirection = MovementDirection.UpLeft
        } else {
            movementDirection = MovementDirection.Left
        }
    } else {
        if (controller.dy() > 0) {
            movementDirection = MovementDirection.Down
        } else if (controller.dy() < 0) {
            movementDirection = MovementDirection.Up
        }
    }
})
function getMovementDirectionRowOffset () {
    if (movementDirection == MovementDirection.Up) {
        return -2
    } else if (movementDirection == MovementDirection.UpLeft || movementDirection == MovementDirection.UpRight) {
        return -1
    } else if (movementDirection == MovementDirection.DownLeft || movementDirection == MovementDirection.Down || movementDirection == MovementDirection.DownRight) {
        return 1
    } else {
        return 0
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorSprite.image.equals(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)) {
        cursorSprite.setImage(assets.image`cursor`)
        BlockPreviewOutline.setImage(assets.image`selectedBlockOutline`)
        blockPreviewSprite.setImage(getBlockSprite(selectedBlock))
    } else {
        workingBlockPosition = cursorSprite.tilemapLocation()
        if (tiles.tileAtLocationIsWall(workingBlockPosition)) {
            tiles.setTileAt(workingBlockPosition, assets.tile`transparency16`)
            tiles.setWallAt(workingBlockPosition, false)
        } else {
            tiles.setTileAt(workingBlockPosition, getBlockSprite(selectedBlock))
            tiles.setWallAt(workingBlockPosition, true)
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    playerSprite.setImage(assets.image`player`)
    light.setAll(0x000000)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    playerSprite.setImage(assets.image`playerSneaking`)
    playerSprite.y += 8
    light.setAll(0x00ffff)
})
function getBlockIsSolid (blockId: number) {
    if (blockId == 0) {
        return false
    } else {
        return true
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorSprite.image.equals(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)) {
        cursorSprite.setImage(assets.image`cursor`)
        BlockPreviewOutline.setImage(assets.image`selectedBlockOutline`)
        blockPreviewSprite.setImage(getBlockSprite(selectedBlock))
    } else {
        cursorSprite.setImage(assets.image`blank`)
        BlockPreviewOutline.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        blockPreviewSprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
})
function getMovementDirectionColumnOffset () {
    if (movementDirection == MovementDirection.UpLeft || movementDirection == MovementDirection.Left || movementDirection == MovementDirection.DownLeft) {
        return -1
    } else if (movementDirection == MovementDirection.UpRight || movementDirection == MovementDirection.Right || movementDirection == MovementDirection.DownRight) {
        return 1
    } else {
        return 0
    }
}
let workingBlockPosition: tiles.Location = null
let playerOnGround = false
let numberOfBlocks = 0
let BlockPreviewOutline: Sprite = null
let blockPreviewSprite: Sprite = null
let cursorSprite: Sprite = null
let selectedBlock = 0
let playerSprite: Sprite = null
light.setBrightness(20)
light.setAll(0x000000)
let movementDirection: MovementDirection
enum MovementDirection {
    Up, UpLeft, Left, DownLeft, Down, DownRight, Right, UpRight
}
playerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
if (game.ask("Press A:    Normal world", "Press B: Superflat world")) {
    tiles.setCurrentTilemap(tilemap`normal`)
} else {
    tiles.setCurrentTilemap(tilemap`superflat`)
}
game.showLongText("Welcome to RoboKraft!\\n- Press left and right buttons to move.\\n- Hold up to Jump.\\n- Hold down to sneak.\\n- Pressing movement buttons moves the cursor automatically.\\n- Press A to place or break blocks.\\n- Press B to switch block.", DialogLayout.Full)
scene.setBackgroundImage(assets.image`backdrop`)
selectedBlock = 1
cursorSprite = sprites.create(assets.image`cursor`, SpriteKind.Cursor)
blockPreviewSprite = sprites.create(getBlockSprite(selectedBlock), SpriteKind.Cursor)
BlockPreviewOutline = sprites.create(assets.image`selectedBlockOutline`, SpriteKind.Cursor)
numberOfBlocks = 9
tiles.placeOnTile(playerSprite, tiles.getTileLocation(randint(0, 127), 0))
playerSprite.y += 10
while (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(playerSprite.tilemapLocation().column, playerSprite.tilemapLocation().row + 1)))) {
    playerSprite.y += 16
}
playerSprite.ay = 200
blockPreviewSprite.setFlag(SpriteFlag.RelativeToCamera, true)
blockPreviewSprite.setPosition(8, 8)
BlockPreviewOutline.setFlag(SpriteFlag.RelativeToCamera, true)
BlockPreviewOutline.setPosition(9, 9)
game.onUpdate(function () {
    if (playerSprite.isHittingTile(CollisionDirection.Bottom)) {
        playerOnGround = true
    }
    scene.centerCameraAt(playerSprite.x, playerSprite.y)
    controller.moveSprite(playerSprite, 100, 0)
    tiles.placeOnTile(cursorSprite, tiles.getTileLocation(playerSprite.tilemapLocation().column + getMovementDirectionColumnOffset(), playerSprite.tilemapLocation().row + getMovementDirectionRowOffset()))
    if (playerSprite.tilemapLocation().row >= 31) {
        game.setGameOverMessage(false, "You fell out of the world!")
        game.gameOver(false)
    }
})
