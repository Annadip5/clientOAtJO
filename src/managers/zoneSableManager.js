import { ActionManager, Color3, ExecuteCodeAction, Mesh, StandardMaterial } from "@babylonjs/core";

class ZoneSableManager {
    scene;
    localPlayer;
    arena;

    constructor(scene, localPlayer, arena) {
        this.scene = scene;
        this.localPlayer = localPlayer;
        this.arena = arena;
        this.createZoneSable()
    }

    createZoneSable() {
        console.log("function create zone sable")

        this.arena.zoneSable.actionManager = new ActionManager(this.scene);

        this.arena.zoneSable.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: this.localPlayer.gameObject
                },
                () => {
                    console.log("Entrée dans la zone de sable !");
                    this.localPlayer.setRunningSpeed(6); // Réduit la vitesse de déplacement
                }
            )
        );

        this.arena.zoneSable.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnIntersectionExitTrigger,
                    parameter: this.localPlayer.gameObject
                },
                () => {
                    console.log("Sortie de la zone de sable !");
                    this.localPlayer.setRunningSpeed(14); // Réinitialise la vitesse de déplacement
                }
            )
        );
    }


}

export default ZoneSableManager;
