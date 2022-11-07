using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class deleteQuantityField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "FixedAsset");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "FixedAsset",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
