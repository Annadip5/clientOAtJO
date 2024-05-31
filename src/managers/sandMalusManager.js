import { ActionManager, Color3, ExecuteCodeAction, Mesh, Sound, StandardMaterial, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";

class SandMalusManager {
    scene;
    localPlayer;
    room
    greenRects = [
        { position: [-50, 0.1, 16], rotation: [0, 0, 0], taille: [90, 7, 1] },
        { position: [-130, 0.1, 28], rotation: [0, 0, 0], taille: [10, 10, 1] },


    ];
    redRects = [

        { position: [-100, 0.1, -94], rotation: [0, 0, 0], taille: [4, 2, 1] },
        { position: [-100, 0.1, 29.3], rotation: [0, 0, 0], taille: [4, 2, 1] },
        { position: [-230, 0.1, -6], rotation: [0, Math.PI / 4, 0], taille: [3, 7, 1] },
        { position: [-130, 0.1, 21], rotation: [0, 0, 0], taille: [4, 2, 1] },

        /*{ finish: "finish" }*/
    ];

    constructor(scene, localPlayer, room) {
        this.scene = scene;
        this.localPlayer = localPlayer;
        this.room = room || null;

    }
    async createGreenArrow(positions, rotations, taille) {
        const greenRectangle = Mesh.CreateGround("greenRectangle", taille[0], taille[1], taille[2], this.scene);
        greenRectangle.position = new Vector3(positions[0], positions[1], positions[2]);
        greenRectangle.scaling = new Vector3(2.1, 1, 1);
        greenRectangle.rotation = new Vector3(rotations[0], rotations[1], rotations[2]);
        greenRectangle.material = new StandardMaterial("greenMat", this.scene);
        greenRectangle.material.diffuseColor = new Color3(0, 1, 1); // Vert
        greenRectangle.checkCollisions = true;
        greenRectangle.material.alpha = 0.5;
        greenRectangle.actionManager = new ActionManager(this.scene);

        greenRectangle.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: this.localPlayer.gameObject
                },
                () => {
                    this.localPlayer.setRunningSpeed(5);


                }
            )
        );

        greenRectangle.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnIntersectionExitTrigger,
                    parameter: this.localPlayer.gameObject
                },
                () => {
                    // Ensure the speed is reset when exiting the rectangle
                    this.localPlayer.setRunningSpeed(14);
                }
            )
        );
    }

    async createArrowsSand() {
        for (const greenPosition of this.greenRects) {
            await this.createGreenArrow(greenPosition.position, greenPosition.rotation, greenPosition.taille);
        }

    }


}


export default SandMalusManager;
