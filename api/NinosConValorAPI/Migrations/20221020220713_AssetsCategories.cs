using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class AssetsCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetCategoryId",
                table: "FixedAsset",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AssetCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Category = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetCategory", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FixedAsset_AssetCategoryId",
                table: "FixedAsset",
                column: "AssetCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_AssetCategory_AssetCategoryId",
                table: "FixedAsset",
                column: "AssetCategoryId",
                principalTable: "AssetCategory",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_AssetCategory_AssetCategoryId",
                table: "FixedAsset");

            migrationBuilder.DropTable(
                name: "AssetCategory");

            migrationBuilder.DropIndex(
                name: "IX_FixedAsset_AssetCategoryId",
                table: "FixedAsset");

            migrationBuilder.DropColumn(
                name: "AssetCategoryId",
                table: "FixedAsset");
        }
    }
}
