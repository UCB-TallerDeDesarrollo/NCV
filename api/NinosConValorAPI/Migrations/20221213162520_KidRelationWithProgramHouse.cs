using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class KidRelationWithProgramHouse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProgramHouse",
                table: "Kid");

            migrationBuilder.AddColumn<int>(
                name: "ProgramHouseId",
                table: "Kid",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Kid_ProgramHouseId",
                table: "Kid",
                column: "ProgramHouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Kid_ProgramHouse_ProgramHouseId",
                table: "Kid",
                column: "ProgramHouseId",
                principalTable: "ProgramHouse",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kid_ProgramHouse_ProgramHouseId",
                table: "Kid");

            migrationBuilder.DropIndex(
                name: "IX_Kid_ProgramHouseId",
                table: "Kid");

            migrationBuilder.DropColumn(
                name: "ProgramHouseId",
                table: "Kid");

            migrationBuilder.AddColumn<string>(
                name: "ProgramHouse",
                table: "Kid",
                type: "text",
                nullable: true);
        }
    }
}
