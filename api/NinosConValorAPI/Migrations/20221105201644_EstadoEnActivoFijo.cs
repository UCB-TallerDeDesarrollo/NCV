using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class EstadoEnActivoFijo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "FixedAsset",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "FixedAsset");
        }
    }
}
