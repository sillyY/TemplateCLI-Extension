import { workspace, WorkspaceConfiguration } from "vscode";

export function getWorkspaceConfiguration(): WorkspaceConfiguration {
    return workspace.getConfiguration("template");
}

export function getWorkspaceFolder(): string {
    return getWorkspaceConfiguration().get<string>("workspaceFolder", "");
}