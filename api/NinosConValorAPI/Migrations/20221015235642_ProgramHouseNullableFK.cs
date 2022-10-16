using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class ProgramHouseNullableFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_ProgramHouse_ProgramHouseId",
                table: "FixedAsset");

            migrationBuilder.AlterColumn<int>(
                name: "ProgramHouseId",
                table: "FixedAsset",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_ProgramHouse_ProgramHouseId",
                table: "FixedAsset",
                column: "ProgramHouseId",
                principalTable: "ProgramHouse",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_ProgramHouse_ProgramHouseId",
                table: "FixedAsset");

            migrationBuilder.AlterColumn<int>(
                name: "ProgramHouseId",
                table: "FixedAsset",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_ProgramHouse_ProgramHouseId",
                table: "FixedAsset",
                column: "ProgramHouseId",
                principalTable: "ProgramHouse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
