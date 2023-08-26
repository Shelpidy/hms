import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

class BloodTransfusion extends Model {
  public transfusionId!: number;
  public donorId?: number;
  public recipientId?: number;
  public transfusionDate!: Date;
  public bloodGroupId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BloodTransfusion.init(
  {
    transfusionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    donorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Donors',
        key: 'donorId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    recipientId: {
      type: DataTypes.UUID,
      references: {
        model: 'Requirers',
        key: 'requirerId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    transfusionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bloodGroupId: {
      type: DataTypes.UUID,
      references: {
        model: 'BloodGroups',
        key: 'bloodGroupId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'BloodTransfusion',
    tableName: 'BloodTransfusions',
    timestamps: true,
    underscored: false,
  }
);

export default BloodTransfusion;
