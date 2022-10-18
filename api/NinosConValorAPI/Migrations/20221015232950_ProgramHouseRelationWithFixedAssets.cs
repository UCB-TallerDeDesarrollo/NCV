using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class ProgramHouseRelationWithFixedAssets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProgramHouseId",
                table: "FixedAsset",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FixedAsset_ProgramHouseId",
                table: "FixedAsset",
                column: "ProgramHouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_ProgramHouse_ProgramHouseId",
                table: "FixedAsset",
                column: "ProgramHouseId",
                principalTable: "ProgramHouse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_ProgramHouse_ProgramHouseId",
                table: "FixedAsset");

            migrationBuilder.DropIndex(
                name: "IX_FixedAsset_ProgramHouseId",
                table: "FixedAsset");

            migrationBuilder.DropColumn(
                name: "ProgramHouseId",
                table: "FixedAsset");
        }
    }
}
