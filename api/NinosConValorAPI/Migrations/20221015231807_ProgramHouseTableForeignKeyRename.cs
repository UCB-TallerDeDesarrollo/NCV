using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class ProgramHouseTableForeignKeyRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramHouse_AspNetUsers_UserId",
                table: "ProgramHouse");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ProgramHouse",
                newName: "ResponsibleId");

            migrationBuilder.RenameIndex(
                name: "IX_ProgramHouse_UserId",
                table: "ProgramHouse",
                newName: "IX_ProgramHouse_ResponsibleId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramHouse_AspNetUsers_ResponsibleId",
                table: "ProgramHouse",
                column: "ResponsibleId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramHouse_AspNetUsers_ResponsibleId",
                table: "ProgramHouse");

            migrationBuilder.RenameColumn(
                name: "ResponsibleId",
                table: "ProgramHouse",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ProgramHouse_ResponsibleId",
                table: "ProgramHouse",
                newName: "IX_ProgramHouse_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramHouse_AspNetUsers_UserId",
                table: "ProgramHouse",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
