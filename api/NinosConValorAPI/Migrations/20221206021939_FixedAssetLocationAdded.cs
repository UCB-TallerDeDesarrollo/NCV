using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class FixedAssetLocationAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_AssetResponsibleEntity_AssetResponsibleId",
                table: "FixedAsset");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AssetResponsibleEntity",
                table: "AssetResponsibleEntity");

            migrationBuilder.RenameTable(
                name: "AssetResponsibleEntity",
                newName: "AssetResponsible");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "FixedAsset",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AssetResponsible",
                table: "AssetResponsible",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_AssetResponsible_AssetResponsibleId",
                table: "FixedAsset",
                column: "AssetResponsibleId",
                principalTable: "AssetResponsible",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_AssetResponsible_AssetResponsibleId",
                table: "FixedAsset");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AssetResponsible",
                table: "AssetResponsible");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "FixedAsset");

            migrationBuilder.RenameTable(
                name: "AssetResponsible",
                newName: "AssetResponsibleEntity");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AssetResponsibleEntity",
                table: "AssetResponsibleEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_AssetResponsibleEntity_AssetResponsibleId",
                table: "FixedAsset",
                column: "AssetResponsibleId",
                principalTable: "AssetResponsibleEntity",
                principalColumn: "Id");
        }
    }
}
