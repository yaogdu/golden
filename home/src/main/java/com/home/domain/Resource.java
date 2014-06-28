package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_resource")
public class Resource extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -7388015051339899421L;

  @Id
  @Column(name = "r_id", length = 20)
  private long id;

  @Column(name = "r_name", length = 100)
  private String name;

  @Column(name = "r_type", length = 10)
  private int type;

  @Column(name = "r_format", length = 10)
  private String format;

  @Column(name = "r_thumbnail_md5", length = 100)
  private String thumbnailMd5;

  @Column(name = "r_thumbnail_width", length = 10)
  private double thumbnailWidth;

  @Column(name = "r_thumbnail_height", length = 10)
  private double thumbnailHeight;

  @Column(name = "r_md5", length = 100)
  private String md5;

  @Column(name = "r_owner_id", length = 10)
  private long ownerId;

  @Column(name = "r_owner_type", length = 10)
  private int ownerType;

  @Column(name = "r_file_size", length = 20)
  private long fileSize;

  public long getFileSize() {
    return fileSize;
  }

  public String getFormat() {
    return format;
  }

  public long getId() {
    return id;
  }

  public String getMd5() {
    return md5;
  }

  public String getName() {
    return name;
  }

  public long getOwnerId() {
    return ownerId;
  }

  public int getOwnerType() {
    return ownerType;
  }

  public double getThumbnailHeight() {
    return thumbnailHeight;
  }

  public String getThumbnailMd5() {
    return thumbnailMd5;
  }

  public double getThumbnailWidth() {
    return thumbnailWidth;
  }

  public int getType() {
    return type;
  }

  public void setFileSize(long fileSize) {
    this.fileSize = fileSize;
  }

  public void setFormat(String format) {
    this.format = format;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setMd5(String md5) {
    this.md5 = md5;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setOwnerId(long ownerId) {
    this.ownerId = ownerId;
  }

  public void setOwnerType(int ownerType) {
    this.ownerType = ownerType;
  }

  public void setThumbnailHeight(double thumbnailHeight) {
    this.thumbnailHeight = thumbnailHeight;
  }

  public void setThumbnailMd5(String thumbnailMd5) {
    this.thumbnailMd5 = thumbnailMd5;
  }

  public void setThumbnailWidth(double thumbnailWidth) {
    this.thumbnailWidth = thumbnailWidth;
  }

  public void setType(int type) {
    this.type = type;
  }

}
