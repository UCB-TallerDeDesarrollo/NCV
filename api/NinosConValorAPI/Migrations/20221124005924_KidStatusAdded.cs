using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class KidStatusAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Kid",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Kid");
        }
    }
}
